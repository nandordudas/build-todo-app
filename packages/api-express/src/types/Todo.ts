import type BaseModelType from './BaseModelType'
import type { TodoStatus } from './TodoStatuses'

interface Todo extends BaseModelType {
  id: string
  title: string
  created_at: string
  updated_at: string
  parent_todo_id: string
  status: TodoStatus
}

export default Todo
