import BaseModel from './BaseModel'
import type Query from '../types/Query'
import type Todo from '../types/Todo'
import type TodoPayload from '../types/TodoPayload'
import type { TodoStatus } from '../types/TodoStatuses'
import { TodoStatuses } from '../types/TodoStatuses'

class TodoModel extends BaseModel<Todo, TodoPayload> {
  constructor() {
    super()
  }

  public override getAll = async (limit: number, offset: number) => {
    const query = {
      name: 'find-all-todos',
      text: `
        SELECT
          todos.id,
          todos.title,
          todos.created_at,
          todos.updated_at,
          todos.parent_todo_id,
          statuses.title AS status
        FROM
          todos
          JOIN todo_status ON 1=1
            AND todos.id = todo_status.todo_id
          JOIN statuses ON 1=1
            AND todo_status.status_id = statuses.id
        ORDER BY todos.created_at
        LIMIT $1
        OFFSET $2
      `,
      values: [limit, offset],
    }

    const { rows } = await this.databaseConnection.runQuery<Todo>(query)

    return rows
  }

  public override getById = async (id: string) => {
    const query: Query = {
      name: 'get-todo-by-id',
      text: `
        SELECT
          todos.id,
          todos.title,
          todos.created_at,
          todos.updated_at,
          todos.parent_todo_id,
          statuses.title AS status
        FROM
          todos
          JOIN todo_status ON 1=1
            AND todos.id = todo_status.todo_id
          JOIN statuses ON 1=1
            AND todo_status.status_id = statuses.id
          WHERE 1=1
            AND todos.id = $1
      `,
      values: [id],
    }

    const { rows } = await this.databaseConnection.runQuery<Todo>(query)

    return rows[0]
  }

  public override create = async (payload: TodoPayload) => {
    const query: Query = {
      name: 'create-todo',
      text: `INSERT INTO todos(title)
              VALUES($1)
              RETURNING *`,
      values: [payload.title],
    }

    try {
      this.databaseConnection.startTransaction()

      const { rows } = await this.databaseConnection.runQuery(query)

      const { id } = rows[0]

      await this.setStatus(id)

      const result = await this.getById(id)

      this.databaseConnection.commit()

      return result
    }
    catch (error) {
      this.databaseConnection.rollback()

      throw error
    }
    finally {
      this.databaseConnection.releaseClient()
    }
  }

  public override update = async (id: string, payload: TodoPayload) => {
    const query = {
      name: 'update-todo',
      text: `
      UPDATE todos SET
        title= $2
      WHERE 1=1
        AND todos.id = $1
      RETURNING todos.id
      `,
      values: [id, payload.title],
    }

    try {
      this.databaseConnection.startTransaction()

      const { rows } = await this.databaseConnection.runQuery(query)

      const { id } = rows[0]

      if (payload.status)
        await this.setStatus(id, payload.status)

      this.databaseConnection.commit()

      const result = await this.getById(id)

      return result
    }
    catch (error) {
      this.databaseConnection.rollback()

      throw error
    }
    finally {
      this.databaseConnection.releaseClient()
    }
  }

  public override delete = async (id: string) => {
    const query = {
      name: 'delete-todo',
      text: `
      DELETE
        FROM todos
      WHERE 1=1
        AND todos.id = $1
      `,
      values: [id],
    }

    await this.databaseConnection.runQuery(query)
  }

  private setStatus = async (id: string, status: TodoStatus = 'pending') => {
    const query = {
      name: 'set-default-status',
      text: `
        INSERT INTO todo_status(todo_id, status_id)
          VALUES($1, $2)
        ON CONFLICT (todo_id) DO UPDATE
          SET status_id = $2
        `,
      values: [id, TodoStatuses[status]],
    }

    await this.databaseConnection.runQuery(query)
  }
}

export default TodoModel
