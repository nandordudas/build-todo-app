import type { Schema } from './Schema/Schematizeable'
import type { Validateable } from './Validateable'

abstract class Validator implements Validateable {
  constructor(protected schema: Schema) {}

  public validate(payload: Record<string, any>): boolean {
    const { validationRules } = this.schema

    if (!validationRules)
      return false

    const result = validationRules.map(({ property, rules }) => {
      const res = rules
        .map(fn => fn(payload[property]))
        .every(element => element === true)

      return res
    })

    if (result.includes(false))
      throw new Error('Missing or invalid parameters!')

    return true
  }
}

export default Validator
