import type { Schema } from './Schema/Schematizeable'
import type Validateable from './Validateable'
import type { Payload } from '../../types/Payload'

abstract class Validator implements Validateable {
  protected schema: Schema

  constructor(schema: Schema) {
    this.schema = schema
  }

  public abstract validate(payload: Payload | undefined): boolean
}

export default Validator
