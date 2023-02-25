import PayloadSchema from './Schema/PayloadSchema'
import type { Schema } from './Schema/Schematizeable'
import Validator from './Validator'
import type TodoPayload from '../../types/TodoPayload'

class PayloadValidator extends Validator {
  constructor(schema: Schema = new PayloadSchema().getSchema) {
    super(schema)
  }

  public override validate = (payload: TodoPayload) => {
    const { validationRules } = this.schema

    if (!validationRules)
      return false

    const result = validationRules.map(({ property, rules }) => {
      const res = rules.filter((fn) => {
        return !fn(payload[property])
      })

      return res.length === 0
    })

    return result.length === 0
  }
}

export default PayloadValidator
