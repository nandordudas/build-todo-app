<?php

declare(strict_types=1);

use TodoApp\ApiPhp\Controllers\TodoController;
use TodoApp\ApiPhp\Enums\Statuses;

require __DIR__ . '/../vendor/autoload.php';

$controller = new TodoController();

var_dump($controller->index());
