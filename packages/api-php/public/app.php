<?php

declare(strict_types=1);

use TodoApp\ApiPhp\Controllers\TodoController;
use TodoApp\ApiPhp\Http\Request;
use TodoApp\ApiPhp\Http\Router;

require __DIR__ . '/../vendor/autoload.php';

class Application
{
  public static function main(): void
  {
    try {
      $router = new Router(new Request());

      $controller = TodoController::class;

      $router
      ->get('/todos', [$controller, 'index'])
      ->get('/todos/{id}', [$controller, 'show'])
      ->post('/todos', [$controller, 'store'])
      ->patch('/todos/{id}', [$controller, 'update'])
      ->delete('/todos/{id}', [$controller, 'destroy']);

      var_dump($router->resolve()->send());
    } catch (\Throwable $th) {
      var_dump($th->getMessage());
    }
  }
}

Application::main();
