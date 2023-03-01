import type { Payload, TodoStatus } from '~/types'

export interface TodoPayload extends Payload {
  title: string
  status: TodoStatus
}
