<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Models;

use TodoApp\ApiPhp\Database\Database;
use TodoApp\ApiPhp\Enums\Statuses;

class TodoModel extends BaseModel
{
  public function __construct()
  {
    $this->database = Database::getConnection();
  }

  public function findAll(): ?array
  {
    $query = <<<SQL
            select
              todos.id,
              todos.title,
              todos.created_at,
              todos.updated_at,
              todos.parent_todo_id,
              statuses.title as status
            from
              todos
              join todo_status on 1=1
                and todos.id = todo_status.todo_id
              join statuses on 1=1
                and todo_status.status_id = statuses.id
            SQL;

    return $this->database->fetch($query);
  }

  public function create(array $payload): array
  {
    $query = <<<SQL
            insert into todos(title)
            values(:title)
            SQL;

    $newTodo = $this->database->fetch($query, ['title' => $payload['title']]);

    $lastInsertedId = $this->database->getLastInsertedId();

    $this->setStatus($lastInsertedId);

    return $newTodo;
  }

  public function getById(int $id): array
  {
    $query = <<<SQL
    select
      todos.id,
      todos.title,
      todos.created_at,
      todos.updated_at,
      todos.parent_todo_id,
      statuses.title as status
    from
      todos
      join todo_status on 1=1
        and todos.id = todo_status.todo_id
      join statuses on 1=1
        and todo_status.status_id = statuses.id
      where 1=1
        and todos.id = :id
    SQL;

    return $this->database->fetch($query, ['id' => $id]);
  }

  public function update(array $payload): array
  {
    $query = <<<SQL
    update todos set
      title= :title
    where 1=1
      and todos.id = :id
    SQL;

    $this->database->fetch($query, [
      'title' => $payload['title'],
      'id' => $payload['id']
    ]);

    if ($payload['status']) {
      $this->setStatus((int) $payload['id'], $payload['status']);
    }

    return $this->getById($payload['id']);
  }

  public function delete(int $id): void
  {
    $query = <<<SQL
    delete
      from todos
    where 1=1
      and todos.id = :id
  SQL;

  $this->database->fetch($query, ['id' => $id]);
  }

  private function setStatus(int $id, ?Statuses $status = null): void
  {
    $query = <<<SQL
            insert into todo_status(todo_id, status_id)
              values(:todo_id, :status_id)
            on conflict (todo_id) do update
              set status_id = :status_id
            SQL;

    $this->database->fetch($query, ['todo_id' => $id, 'status_id' => $status?->value ?? Statuses::PENDING->value]);
  }
}
