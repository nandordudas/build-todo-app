<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Repositories;

use TodoApp\ApiPhp\Models\BaseModel;

abstract class BaseRepository
{
  public function __construct(protected BaseModel $model)
  {
  }

  public function findAll(): ?array
  {
    return $this->model->findAll();
  }

  public function create(array $payload): array
  {
    return $this->model->create($payload);
  }

  public function getById(int $id): ?array
  {
    return $this->model->getById($id);
  }

  public function update(array $payload): array
  {
    return $this->model->update($payload);
  }

  public function delete(int $id): bool
  {
    return $this->model->delete($id);
  }
}
