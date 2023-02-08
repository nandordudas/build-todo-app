<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Models;

use DatabaseAdapterPhp\Contracts\Connectable;
use TodoApp\ApiPhp\Contracts\ModelInterface;

abstract class BaseModel implements ModelInterface
{
  abstract public function findAll(): ?array;
  abstract public function create(array $payload): array;
  abstract public function getById(int $id): array;
  abstract public function update(array $payload): array;
  abstract public function delete(int $id): void;

  public function __construct(protected Connectable $database)
  {
  }
}
