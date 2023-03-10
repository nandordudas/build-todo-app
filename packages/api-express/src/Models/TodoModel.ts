import { type Query, type Todo, type TodoPayload, type TodoStatus, TodoStatuses } from '~/types'

import BaseModel from './BaseModel'

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

        ORDER BY
          todos.created_at

        LIMIT $1 OFFSET $2
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

    const result = await this.findFirst<Todo>(query)

    return result
  }

  public override create = async (payload: TodoPayload) => {
    const query: Query = {
      name: 'create-todo',
      text: `
        INSERT INTO todos
          (title)

        VALUES
          ($1)

        RETURNING *
      `,
      values: [payload.title],
    }

    try {
      await this.databaseConnection.startTransaction()

      const { id } = await this.findFirst<Todo>(query)

      await this.setStatus(id)
      await this.databaseConnection.commit()

      const result = await this.getById(id)

      return result
    }
    catch (error) {
      await this.databaseConnection.rollback()

      throw error
    }
    finally {
      await this.databaseConnection.releaseClient()
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

        RETURNING
          todos.id
      `,
      values: [id, payload.title],
    }

    const task = await this.getById(id)

    if (!task)
      return undefined

    try {
      await this.databaseConnection.startTransaction()

      const { id } = await this.findFirst<Todo>(query)

      if (payload.status)
        await this.setStatus(id, payload.status)

      await this.databaseConnection.commit()

      const result = await this.getById(id)

      return result
    }
    catch (error) {
      await this.databaseConnection.rollback()

      throw error
    }
    finally {
      await this.databaseConnection.releaseClient()
    }
  }

  public override delete = async (id: string) => {
    const query = {
      name: 'delete-todo',
      text: `
        DELETE FROM todos

        WHERE 1=1
          AND todos.id = $1

        RETURNING
          todos.id
      `,
      values: [id],
    }

    const result = await this.databaseConnection.runQuery<Todo>(query)

    return result.rowCount > 0
  }

  private setStatus = async (id: string, status: TodoStatus = 'pending') => {
    const query = {
      name: 'set-default-status',
      text: `
        INSERT INTO todo_status
          (todo_id, status_id)

        VALUES
          ($1, $2)

        ON CONFLICT (todo_id) DO UPDATE
          SET status_id = $2
        `,
      values: [id, TodoStatuses[status]],
    }

    await this.databaseConnection.runQuery(query)
  }
}

export default TodoModel
