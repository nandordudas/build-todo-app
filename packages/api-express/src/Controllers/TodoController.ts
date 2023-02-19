import type { NextFunction, Request, Response } from 'express'

import BaseController from './BaseController'
import HttpStatusCodes from '../Enums/HttpStatusCodes'
import TodoRepository from '../Repositories/TodoRepository'
import type Todo from '../types/Todo'
import type TodoPayload from '../types/TodoPayload'
import type TodoResponse from '../types/TodoResponse'

class TodoController extends BaseController<Todo, TodoPayload> {
  constructor() {
    super(new TodoRepository())
  }

  public override index = async (
    request: Request,
    response: Response<TodoResponse>,
    next: NextFunction) => {
    try {
      const limit = Number(request.params.limit) ?? 10
      const offset = Number(request.params.offset) ?? 0

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
      const payload: TodoPayload = request.body

      const result = await this.repository.create(payload) as Todo

      return response.status(201).send({
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
      const { id } = request.params

      const payload: TodoPayload = request.body

      const result = await this.repository.update(id, payload) as Todo

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

      await this.repository.delete(id)

      return response.status(HttpStatusCodes.NO_CONTENT)
    }
    catch (error) {
      next(error)
    }
  }
}

export default TodoController
