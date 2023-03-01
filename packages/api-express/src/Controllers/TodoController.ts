import type { NextFunction, Request, Response } from 'express'

import { HttpStatusCodes } from '~/Enums/HttpStatusCodes'
import TodoRepository from '~/Repositories/TodoRepository'
import type { Todo, TodoPayload, TodoResponse } from '~/types'
import ResponseError from '~/Utilities/Errors/ResponseError'
import ValidationError from '~/Utilities/Errors/ValidationError'
import PayloadValidator from '~/Utilities/Validators/PayloadValidator'

import BaseController from './BaseController'

class TodoController extends BaseController<Todo, TodoPayload, PayloadValidator> {
  constructor() {
    super(new TodoRepository(), new PayloadValidator())
  }

  public override index = async (
    request: Request<{}, {}, {}, { limit: string; offset: string }>,
    response: Response<TodoResponse>,
    next: NextFunction,
  ) => {
    try {
      const limit = parseInt(request.query.limit) || 10
      const offset = parseInt(request.query.offset) || 0
      const result = await this.repository.getAll(limit, offset)

      if (!result)
        throw new ResponseError(HttpStatusCodes.BAD_REQUEST, 'Tasks cannot be found')

      return response.status(HttpStatusCodes.OK).send({
        status: 'OK',
        data: result,
      })
    }
    catch (error) {
      return next(error)
    }
  }

  public override show = async (
    request: Request<{ id: string }, {}, {}, {}>,
    response: Response<TodoResponse>,
    next: NextFunction,
  ) => {
    try {
      const { id } = request.params
      const result = await this.repository.getById(id)

      if (!result)
        throw new ResponseError(HttpStatusCodes.BAD_REQUEST, 'Task cannot be found')

      return response.status(HttpStatusCodes.OK).send({
        status: 'OK',
        data: result,
      })
    }
    catch (error) {
      return next(error)
    }
  }

  public override store = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction,
  ) => {
    try {
      const payload: TodoPayload = request.body

      if (!payload || !this.validator.validate(payload))
        throw new ValidationError(HttpStatusCodes.BAD_REQUEST, 'Missing payload parameters!')

      const result = await this.repository.create(payload)

      if (!result)
        throw new ResponseError(HttpStatusCodes.BAD_REQUEST, 'Task cannot be created!')

      return response.status(HttpStatusCodes.CREATED).send({
        status: 'OK',
        data: result,
      })
    }
    catch (error) {
      return next(error)
    }
  }

  public override update = async (
    request: Request<{ id: string }, {}, TodoPayload, {}>,
    response: Response<TodoResponse>,
    next: NextFunction,
  ) => {
    try {
      const { id } = request.params
      const payload = request.body

      if (!payload || !this.validator.validate(payload))
        throw new ValidationError(HttpStatusCodes.BAD_REQUEST, 'Missing or invalid payload parameters!')

      const result = await this.repository.update(id, payload)

      if (!result)
        throw new ResponseError(HttpStatusCodes.BAD_REQUEST, 'Task cannot be updated!')

      return response.status(HttpStatusCodes.OK).send({
        status: 'OK',
        data: result,
      })
    }
    catch (error) {
      return next(error)
    }
  }

  public override destroy = async (
    request: Request<{ id: string }, {}, {}, {}>,
    response: Response<TodoResponse>,
    next: NextFunction,
  ) => {
    try {
      const { id } = request.params
      const result = await this.repository.delete(id)

      if (!result)
        throw new ResponseError(HttpStatusCodes.BAD_REQUEST, 'Task cannot be deleted!')

      return response.status(HttpStatusCodes.OK).send({
        status: 'OK',
        data: 'Task has been deleted successfully!',
      })
    }
    catch (error) {
      return next(error)
    }
  }
}

export default TodoController
