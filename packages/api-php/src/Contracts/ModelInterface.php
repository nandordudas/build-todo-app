<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Contracts;

interface ModelInterface
{
  public function findAll(): ?array;
  public function create(array $payload): array;
  public function getById(int $id): array;
  public function update(array $payload): array;
  public function delete(int $id): array;
}
