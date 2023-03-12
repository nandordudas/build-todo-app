<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Http;

use TodoApp\ApiPhp\Enums\HttpStatuses;

final class Response
{
  private HttpStatuses $statusCode;
  private ?array $body;

  public static function create(HttpStatuses $statusCode, ?array $body): self
  {
    return (new static)
      ->setStatusCode($statusCode)
      ->setBody($body);
  }

  public function send(): ?array
  {
    http_response_code($this->statusCode->value);

    return $this->body;
  }

  public function setStatusCode(HttpStatuses $statusCode): self
  {
    $this->statusCode = $statusCode;

    return $this;
  }

  public function setBody(?array $body): self
  {
    $this->body = $body;

    return $this;
  }

  public function getStatusCode(): int
  {
    return $this->statusCode->value;
  }

  public function getBody(): ?array
  {
    return $this->body;
  }

  public function __toString()
  {
    return $this->send();
  }
}
