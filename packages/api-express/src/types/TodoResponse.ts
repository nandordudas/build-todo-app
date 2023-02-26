import type Todo from './Todo'

interface TodoResponse {
  status: 'OK' | 'FAILED'
  data: Todo | Todo[] | string
}

export default TodoResponse
