<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Exceptions;

use Exception;

class MissingOrInvalidStatusException extends Exception
{
  protected $message = 'Status is invalid or missing!';
}
