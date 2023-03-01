export interface Validateable {
  validate(payload: Record<string, any>): boolean
}
