import BaseSchema from './BaseSchema'
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
          Rules.rules.status,
        ],
      },
    ])
  }
}

export default PayloadSchema
