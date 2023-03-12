<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Http;

use TodoApp\ApiPhp\Enums\HttpMethods;
use TodoApp\ApiPhp\Exceptions\RouteNotFoundException;
use TodoApp\ApiPhp\Http\Request;

class Router
{

  private ?array $routes = null;

  public function __construct(private Request $request)
  {

  }

  public function get(string $route, callable | array $method): self
  {
    $this->register(HttpMethods::GET, $route, $method);

    return $this;
  }

  public function post(string $route, callable | array $method): self
  {
    $this->register(HttpMethods::POST, $route, $method);

    return $this;
  }

  public function patch(string $route, callable | array $method): self
  {
    $this->register(HttpMethods::PATCH, $route, $method);

    return $this;
  }

  public function delete(string $route, callable | array $method): self
  {
    $this->register(HttpMethods::DELETE, $route, $method);

    return $this;
  }

  public function resolve(): Response
  {
    $path = $this->request->getRequestUri();

    $requestMethod = $this->request->getRequestMethod();

    [$action, $param] = $this->dispatch($requestMethod, $path);

    $this->request->setParams(['id' => $param]);

    if (!$action) {
      throw new RouteNotFoundException();
    }

    if (is_callable($action)) {
      return call_user_func($action);
    }

    if (is_array($action)) {
      [$class, $method] = $action;

      // class_exists not works when we use namespaces
      if (class_exists($class)) {
        $class = new $class();

        if (method_exists($class, $method)) {
          return $class->$method($this->request);
        }
      }
    }

    throw new RouteNotFoundException();
  }

  protected function register(HttpMethods $requestMethod, string $route, callable | array $method): self
  {
    $this->routes[$requestMethod->value][$route] = $method;

    return $this;
  }

  private function dispatch(string $requestMethod, string $path)
  {
    foreach ($this->routes[$requestMethod] as $route => $handler) {
      $pattern = str_replace('{id}', '(\d+)', $route);

      if (preg_match("#^{$pattern}$#", $path, $matches)) {
        return [$handler, $matches[1] ?? null];
      }
  }
}
}
