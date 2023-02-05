<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Controllers;

use TodoApp\ApiPhp\Repositories\BaseRepository;

abstract class BaseController
{
  public function __construct(protected BaseRepository $repository)
  {
  }

  public function index(): ?array
  {
    return $this->repository->findAll();
  }

  public function show(int $id)
  {
    return $this->repository->getById($id);
  }

  public function store(array $payload): array
  {
    return $this->repository->create($payload);
  }

  public function update(array $payload): array
  {
    return $this->repository->update($payload);
  }

  public function destroy(int $id): array
  {
    return $this->repository->delete($id);
  }
}
