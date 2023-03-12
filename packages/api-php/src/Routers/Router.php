<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Routers;

use TodoApp\ApiPhp\Exceptions\RouteNotFoundException;

class Router
{

  private ?array $routes = null;

  protected function register(string $requestMethod, string $route, callable | array $method): self
  {
    $this->routes[$requestMethod][$route] = $method;

    return $this;
  }

  public function get(string $route, callable | array $method): self
  {
    $this->register('get', $route, $method);

    return $this;
  }

  public function post(string $route, callable | array $method): self
  {
    $this->register('post', $route, $method);

    return $this;
  }

  public function patch(string $route, callable | array $method): self
  {
    $this->register('patch', $route, $method);

    return $this;
  }

  public function delete(string $route, callable | array $method): self
  {
    $this->register('delete', $route, $method);

    return $this;
  }

  public function resolve()
  {
    $path = parse_url($_SERVER['REQUEST_URI'])['path'];

    $requestMethod = strtolower($_SERVER['REQUEST_METHOD']);

    $action = $this->routes[$requestMethod][$path];

    if (!$action) {
      throw new RouteNotFoundException();
    }

    if (is_callable($action)) {
      return call_user_func($action);
    }

    if (is_array($action)) {
      [$class, $method] = $action;

      if (class_exists($class)) {
        $class = new $class();

        if (method_exists($class, $method)) {
          return call_user_func_array($action, []);
        }
      }
    }

    throw new RouteNotFoundException();
  }


}
