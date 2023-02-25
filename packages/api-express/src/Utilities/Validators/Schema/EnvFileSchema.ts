import BaseSchema from './BaseSchema'
import Rules from '../Rules'

class EnvFileSchema extends BaseSchema {
  constructor() {
    super('env', [
      {
        property: 'PROTOCOL',
        rules: [
          Rules.rules.string,
        ],
      },
      {
        property: 'HOST',
        rules: [
          Rules.rules.string,
        ],
      },
      {
        property: 'PORT',
        rules: [
          Rules.rules.number,
        ],
      },
      {
        property: 'PGUSER',
        rules: [
          Rules.rules.string,
        ],
      },
      {
        property: 'PGHOST',
        rules: [
          Rules.rules.string,
        ],
      },
      {
        property: 'PGDATABASE',
        rules: [
          Rules.rules.string,
        ],
      },
      {
        property: 'PGPASSWORD',
        rules: [
          Rules.rules.string,
        ],
      },
    ])
  }
}

export default EnvFileSchema
