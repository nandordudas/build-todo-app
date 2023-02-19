import type { Payload } from './Payload'
import type { TodoStatus } from './TodoStatuses'

interface TodoPayload extends Payload {
  title: string
  status: TodoStatus
}

export default TodoPayload
