import type { Schema, Schematizeable, ValidationRule } from './Schematizeable'

abstract class BaseSchema implements Schematizeable {
  protected _schema: Schema

  constructor(title: string, validationRules: ValidationRule[]) {
    this._schema = {
      title,
      validationRules,
    }
  }

  get schema() {
    return this._schema
  }
}

export default BaseSchema
