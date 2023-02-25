import BaseSchema from './BaseSchema'
import { TodoStatuses } from '../../../types/TodoStatuses'
import Rules from '../Rules'

class PayloadSchema extends BaseSchema {
  constructor() {
    super('payload', [
      {
        property: 'title',
        rules: [
          Rules.rules.string,
          (value: string) => value.length > 3,
        ],
      },
      {
        property: 'status',
        rules: [
          (value: string) => Object.keys(TodoStatuses).includes(value),
        ],
      },
    ])
  }
}

export default PayloadSchema
