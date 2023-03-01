import Rules from '~/Utilities/Validators/Rules'

import BaseSchema from './BaseSchema'

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
