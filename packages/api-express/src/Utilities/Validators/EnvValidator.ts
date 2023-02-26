import EnvFileSchema from './Schema/EnvFileSchema'
import type { Schema } from './Schema/Schematizeable'
import Validator from './Validator'

class EnvValidator extends Validator {
  constructor(schema: Schema = new EnvFileSchema().getSchema) {
    super(schema)
  }

  public static parsePort = (port: string) => {
    const parsedPort = parseInt(port, 10)

    if (isNaN(parsedPort))
      return null

    return parsedPort
  }
}

export default EnvValidator
