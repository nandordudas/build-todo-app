<?php

declare(strict_types=1);

namespace TodoApp\ApiPhp\Controllers;

use TodoApp\ApiPhp\Enums\HttpStatuses;
use TodoApp\ApiPhp\Enums\TodoStatuses;
use TodoApp\ApiPhp\Exceptions\MissingOrInvalidStatusException;
use TodoApp\ApiPhp\Exceptions\MissingPayloadException;
use TodoApp\ApiPhp\Http\Response;
use TodoApp\ApiPhp\Http\Request;
use TodoApp\ApiPhp\Repositories\TodoRepository;

class TodoController extends BaseController
{
  public function __construct()
  {
    parent::__construct(new TodoRepository());
  }

  public function index(): Response
  {
    $result = $this->repository->findAll();

    return $this->createResponse(result: $result, statusOnFailure: HttpStatuses::NOT_FOUND);
  }

  public function show(Request $request): Response
  {
    $result = $this->repository->getById((int) $request->getParams()['id']);

    return $this->createResponse(result: $result, statusOnFailure: HttpStatuses::NOT_FOUND);
   }

  public function store(Request $request): Response
  {
    //TODO: Create a validator middleware
    if (empty($request->getPayload()))
    {
      throw new MissingPayloadException();
    }

    $result = $this->repository->create($request->getPayload());

    return $this->createResponse(result: $result, statusOnSuccess: HttpStatuses::CREATED);
  }

  public function update(Request $request): Response
  {
    //TODO: Create a payload validator middleware
    $payload = $request->getPayload();
    $status = $payload['status'];

    if (empty($payload)) {
      throw new MissingPayloadException();
    }

    // TODO: find a better way to get the values of the enum cases
    if (!$status || !in_array($status, [TodoStatuses::COMPLETED->value, TodoStatuses::PENDING->value])) {
      throw new MissingOrInvalidStatusException();
    }

    $result = $this->repository->update([...$request->getParams(), ...$request->getPayload()]);

    return $this->createResponse(result: $result);
   }

  public function destroy(Request $request): Response
  {
    $result = $this->repository->delete((int) $request->getParams()['id']);

    return $this->createResponse([$result], HttpStatuses::NO_CONTENT);
  }

  protected function createResponse(
    ?array $result,
    HttpStatuses $statusOnSuccess = HttpStatuses::OK,
    HttpStatuses $statusOnFailure = HttpStatuses::BAD_REQUEST
  )
  {
    return Response::create($result ? $statusOnSuccess : $statusOnFailure, $result);
  }
}
