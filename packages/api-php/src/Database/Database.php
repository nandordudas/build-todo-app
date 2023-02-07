<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Database;

use DatabaseAdapterPhp\Contracts\Connectable;
use DatabaseAdapterPhp\Factories\PostgreSQLConnectionFactory;

class Database
{
  private static ?Connectable $connection;

  // TODO: use environment variables to set the connection data
  private const CONNECTION_DATA = null;
  private const PDO_OPTIONS = null;

  public static function getConnection()
  {
    return self::$connection
      ??= PostgreSQLConnectionFactory::create(self::CONNECTION_DATA, self::PDO_OPTIONS);
  }
}
