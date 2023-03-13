<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Enums;

enum HttpMethods: string {
  case GET = 'get';
  case POST = 'post';
  case PATCH = 'patch';
  case DELETE = 'delete';
}
