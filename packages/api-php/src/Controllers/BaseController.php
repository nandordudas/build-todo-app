<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Controllers;

use TodoApp\ApiPhp\Contracts\Controlable;
use TodoApp\ApiPhp\Http\Request;
use TodoApp\ApiPhp\Http\Response;
use TodoApp\ApiPhp\Repositories\BaseRepository;

abstract class BaseController implements Controlable
{
  public function __construct(protected BaseRepository $repository)
  {
  }

  abstract public function index(): Response;

  abstract public function show(Request $request): Response;

  abstract public function store(Request $request): Response;

  abstract public function update(Request $request): Response;

  abstract public function destroy(Request $request): Response;
}
