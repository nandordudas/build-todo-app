<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Repositories;

use TodoApp\ApiPhp\Models\TodoModel;

class TodoRepository extends BaseRepository
{
  public function __construct()
  {
    parent::__construct(new TodoModel());
  }
}
