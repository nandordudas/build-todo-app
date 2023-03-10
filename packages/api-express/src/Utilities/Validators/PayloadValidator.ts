import PayloadSchema from './Schema/PayloadSchema'
import type { Schema } from './Schema/Schematizeable'
import Validator from './Validator'

class PayloadValidator extends Validator {
  constructor(schema: Schema = new PayloadSchema().schema) {
    super(schema)
  }
}

export default PayloadValidator
