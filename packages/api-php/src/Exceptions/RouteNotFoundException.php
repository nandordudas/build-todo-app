<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Exceptions;

use Exception;

class RouteNotFoundException extends Exception
{
  protected $message = '404 NOT FOUND';
}
