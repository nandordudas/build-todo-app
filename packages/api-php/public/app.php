<?php

declare(strict_types=1);

use TodoApp\ApiPhp\Http\Request;
use TodoApp\ApiPhp\Http\Router;

require __DIR__ . '/../vendor/autoload.php';

$router = new Router(new Request());

$router
  ->get('/todos', ['TodoApp\ApiPhp\Controllers\TodoController', 'index'])
  ->get('/todos/{id}', ['TodoApp\ApiPhp\Controllers\TodoController', 'show']);

var_dump($router->resolve()->send());
