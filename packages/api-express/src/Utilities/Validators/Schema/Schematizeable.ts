export type ValidationFunction = (value: any) => boolean

export interface ValidationRule {
  property: string
  rules: ValidationFunction[]
}

export interface Schema {
  title: string
  validationRules: ValidationRule[]
}

export interface Schematizeable {
  get getSchema(): Schema
}
