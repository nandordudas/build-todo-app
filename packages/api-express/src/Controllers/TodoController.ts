import type { NextFunction, Request, Response } from 'express'

import BaseController from './BaseController'
import HttpStatusCodes from '../Enums/HttpStatusCodes'
import TodoRepository from '../Repositories/TodoRepository'
import type Todo from '../types/Todo'
import type TodoPayload from '../types/TodoPayload'
import type TodoResponse from '../types/TodoResponse'
import PayloadValidator from '../Utilities/Validators/PayloadValidator'
import PayloadSchema from '../Utilities/Validators/Schema/PayloadSchema'

class TodoController extends BaseController<Todo, TodoPayload> {
  constructor() {
    super(new TodoRepository())
  }

  public override index = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
    try {
      const limit = parseInt(request.query.limit as string) || 10
      const offset = parseInt(request.query.offset as string) || 0

      const result = await this.repository.getAll(limit, offset)

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
      // TODO: Validator can be a property in the controller
      const validator = new PayloadValidator()

      const payload: TodoPayload = await request.body

      console.log(payload)

      if (!payload || !validator.validate(payload))
        throw new Error('Invalid or missing payload arguments!')

      const result = await this.repository.create(payload)

      if (!result)
        throw new Error('Task cannot be created!')

      return response.status(HttpStatusCodes.CREATED).send({
        status: 'CREATED',
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
      const validator = new PayloadValidator(new PayloadSchema().getSchema)

      const { id } = request.params
      const payload = request.body

      if (!validator.validate(payload))
        throw new Error('Invalid payload arguments!')

      const result = await this.repository.update(id, payload)

      if (!result)
        throw new Error('Task cannot be updated!')

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
    response: Response,
    next: NextFunction) => {
    try {
      const { id } = request.params

      this.repository.delete(id)

      return response.status(HttpStatusCodes.NO_CONTENT)
    }
    catch (error) {
      next(error)
    }
  }
}

export default TodoController
