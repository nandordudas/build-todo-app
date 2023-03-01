import type { BaseModelType, TodoStatus } from '~/types'

export interface Todo extends BaseModelType {
  id: string
  title: string
  created_at: string
  updated_at: string
  parent_todo_id: string
  status: TodoStatus
}
