import type Todo from './Todo'
import type { HttpStatus } from '../Enums/HttpStatusCodes'

interface TodoResponse {
  status: HttpStatus
  data: Todo | Todo[]
}

export default TodoResponse
