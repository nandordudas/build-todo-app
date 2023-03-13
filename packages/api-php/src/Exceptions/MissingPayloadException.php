<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Exceptions;

use Exception;

class MissingPayloadException extends Exception
{
  protected $message = 'Payload is missing!';
}
