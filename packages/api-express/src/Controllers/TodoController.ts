import type { NextFunction, Request, Response } from 'express'

import BaseController from './BaseController'
import HttpStatusCodes from '../Enums/HttpStatusCodes'
import TodoRepository from '../Repositories/TodoRepository'
import type Todo from '../types/Todo'
import type TodoPayload from '../types/TodoPayload'
import type TodoResponse from '../types/TodoResponse'
import ResponseError from '../Utilities/Errors/ResponseError'
import ValidationError from '../Utilities/Errors/ValidationError'
import PayloadValidator from '../Utilities/Validators/PayloadValidator'

class TodoController extends BaseController<Todo, TodoPayload, PayloadValidator> {
  constructor() {
    super(new TodoRepository(), new PayloadValidator())
  }

  public override index = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
    try {
      const limit = parseInt(request.query.limit as string) || 10
      const offset = parseInt(request.query.offset as string) || 0

      const result = await this.repository.getAll(limit, offset)

      if (!result)
        throw new ResponseError(HttpStatusCodes.BAD_REQUEST, 'Tasks cannot be found')

      return response.status(HttpStatusCodes.OK).send({
        status: 'OK',
        data: result,
      })
    }
    catch (error) {
      next(error)
    }
  }

  public override show = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
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
      next(error)
    }
  }

  public override store = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
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
      next(error)
    }
  }

  public override update = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
    try {
      const { id } = request.params

      const payload: TodoPayload = request.body

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
      next(error)
    }
  }

  public override destroy = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
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
      next(error)
    }
  }
}

export default TodoController
