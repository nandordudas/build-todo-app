<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Contracts;

use TodoApp\ApiPhp\Http\Request;
use TodoApp\ApiPhp\Http\Response;

interface Controlable
{
public function index(): Response;

public function show(Request $request): Response;

public function store(Request $request): Response;

public function update(Request $request): Response;

public function destroy(Request $request): Response;

}
