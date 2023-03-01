import type { Todo } from '~/types'

export interface TodoResponse {
  status: 'OK' | 'FAILED'
  data: Todo | Todo[] | string
}
