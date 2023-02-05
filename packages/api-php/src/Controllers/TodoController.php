<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Controllers;

use TodoApp\ApiPhp\Repositories\TodoRepository;

class TodoController extends BaseController
{
  public function __construct()
  {
    parent::__construct(new TodoRepository());
  }
}
