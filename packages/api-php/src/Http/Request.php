<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Http;

class Request
{
  private string $requestUri;
  private string $requestQuery;
  private string $requestMethod;
  private array $payload;
  private array $params;

  public function __construct()
  {
    $this->requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    $this->requestQuery = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY) ?? file_get_contents('php://input');

    $this->requestMethod = strtolower($_SERVER['REQUEST_METHOD']);

    parse_str($this->requestQuery, $result);

    $this->payload = $result;
  }

  public function getRequestMethod(): string
  {
      return $this->requestMethod;
  }

  public function getRequestUri(): string
  {
      return $this->requestUri;
  }

  public function getPayload(): array
  {
      return $this->payload;
  }

  public function setParams(array $params)
  {
    $this->params = $params;
  }

  public function getParams(): array
  {
    return $this->params;
  }

}
