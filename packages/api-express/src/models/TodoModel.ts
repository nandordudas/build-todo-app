import db from '../database'
import type { TodoStatus } from '../types/TodoStatuses'
import { TodoStatuses } from '../types/TodoStatuses'

interface Todo {
  id: string
  title: string
  created_at: string
  updated_at: string
  parent_todo_id: string
  status: TodoStatus
}

const setStatus = async (id: string, status: TodoStatus = 'pending') => {
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

  await db.query(query.text, query.values)
}

const getTodoById = async (id: string): Promise<Todo> => {
  const query = {
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

  const { rows } = await db.query(query.text, query.values)

  if (!rows.length)
    throw new Error('There is no task with the given ID!')

  return rows[0]
}

const addTodo = async (title: string): Promise<Todo> => {
  const query = {
    name: 'create-todo',
    text: `INSERT INTO todos(title)
            VALUES($1)
            RETURNING id`,
    values: [title],
  }

  const { rows } = await db.query(query.text, query.values)

  const { id } = rows[0]

  setStatus(id)

  return await getTodoById(id)
}

const getAllTodos = async (): Promise<Todo[]> => {
  const query = {
    name: 'get-all-todos',
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
    `,
  }

  const { rows } = await db.query(query.text)

  return rows
}

const updateTodo = async (id: string, title: string): Promise<Todo> => {
  const query = {
    name: 'update-todo',
    text: `
    UPDATE todos SET
      title= $2
    WHERE 1=1
      AND todos.id = $1
    RETURNING *
    `,
    values: [id, title],
  }

  const { rows } = await db.query(query.text, query.values)

  return rows[0]
}

const deleteTodo = async (id: string) => {
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

  await db.query(query.text, query.values)
}

export default {
  addTodo: (title: string) => addTodo(title),
  getTodoById: (id: string) => getTodoById(id),
  setStatus: (id: string, status: TodoStatus = 'pending') => setStatus(id, status),
  getAllTodos: () => getAllTodos(),
  updateTodo: (id: string, title: string) => updateTodo(id, title),
  deleteTodo: (id: string) => deleteTodo(id),
}
