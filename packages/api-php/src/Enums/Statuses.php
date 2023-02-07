<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Enums;

enum Statuses: int
{
  case PENDING = 1;
  case COMPLETED = 2;
}
