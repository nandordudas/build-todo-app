import { TodoStatuses } from '~/types'

class Rules {
  static readonly rules = {
    exists: (value: any) => typeof value !== undefined,
    notExists: (value: any) => typeof value === undefined,
    status: (value: string) => Object.keys(TodoStatuses).includes(value),
    string: (value: string) => typeof value === 'string',
    validPort: (value: any) => !isNaN(Number(value)),
  }
}

export default Rules
