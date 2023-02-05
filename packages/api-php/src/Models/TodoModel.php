<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Models;

use TodoApp\ApiPhp\Database\Database;

class TodoModel extends BaseModel
{
  public function __construct()
  {
    $this->database = Database::getConnection();
  }

  public function findAll(): ?array
  {
    return null;
  }

  public function create(array $payload): array
  {
    return [];
  }

  public function getById(int $id): array
  {
    return [];
  }

  public function update(array $payload): array
  {
    return [];
  }

  public function delete(int $id): array
  {
    return [];
  }

}
