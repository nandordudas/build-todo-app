<?php

declare(strict_types=1);

use TodoApp\ApiPhp\Controllers\TodoController;
use TodoApp\ApiPhp\Routers\Router;

require __DIR__ . '/../vendor/autoload.php';

$controller = new TodoController();

$router = new Router();

$router->get('/', [$controller, 'index']);

var_dump($router->resolve());
