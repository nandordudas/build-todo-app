import type { Schema, Schematizeable, ValidationRule } from './Schematizeable'

abstract class BaseSchema implements Schematizeable {
  protected schema: Schema
  constructor(title: string, validationRules: ValidationRule[]) {
    this.schema = {
      title,
      validationRules,
    }
  }

  get getSchema() {
    return this.schema
  }
}

export default BaseSchema
