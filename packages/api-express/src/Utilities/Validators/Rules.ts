import { TodoStatuses } from '../../types/TodoStatuses'

class Rules {
  static readonly rules = {
    exists: (value: any) => typeof value !== undefined,
    notExists: (value: any) => typeof value === undefined,
    string: (value: string) => typeof value === 'string',
    number: (value: any) => !isNaN(Number(value)),
    status: (value: string) => Object.keys(TodoStatuses).includes(value),
  }
}

export default Rules
