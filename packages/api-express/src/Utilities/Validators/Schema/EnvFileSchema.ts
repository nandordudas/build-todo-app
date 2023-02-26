import BaseSchema from './BaseSchema'
import Rules from '../Rules'

class EnvFileSchema extends BaseSchema {
  constructor() {
    super('env', [
      {
        property: 'PROTOCOL',
        rules: [
          Rules.rules.exists,
          Rules.rules.string,
        ],
      },
      {
        property: 'HOST',
        rules: [
          Rules.rules.exists,
          Rules.rules.string,
        ],
      },
      {
        property: 'PORT',
        rules: [
          Rules.rules.exists,
          Rules.rules.validPort,
        ],
      },
      {
        property: 'PGUSER',
        rules: [
          Rules.rules.exists,
          Rules.rules.string,
        ],
      },
      {
        property: 'PGHOST',
        rules: [
          Rules.rules.exists,
          Rules.rules.string,
        ],
      },
      {
        property: 'PGDATABASE',
        rules: [
          Rules.rules.exists,
          Rules.rules.string,
        ],
      },
      {
        property: 'PGPASSWORD',
        rules: [
          Rules.rules.exists,
          Rules.rules.string,
        ],
      },
    ])
  }
}

export default EnvFileSchema
