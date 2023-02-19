import BaseRepository from './BaseRepository'
import TodoModel from '../Models/TodoModel'
import type Todo from '../types/Todo'
import type TodoPayload from '../types/TodoPayload'

class TodoRepository extends BaseRepository<Todo, TodoPayload> {
  constructor() {
    super(new TodoModel())
  }

  public override getAll = (limit: number, offset: number) => {
    return this.model.getAll(limit, offset)
  }

  public override getById = (id: string) => {
    return this.model.getById(id)
  }

  public override create = (payload: TodoPayload) => {
    return this.model.create(payload)
  }

  public override update = (id: string, payload: TodoPayload) => {
    return this.model.update(id, payload)
  }

  public override delete = (id: string) => {
    return this.model.delete(id)
  }
}

export default TodoRepository
