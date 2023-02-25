class Rules {
  static readonly rules = {
    exists: (value: any) => typeof value !== undefined,
    notExists: (value: any) => typeof value === undefined,
    string: (value: string) => typeof value === 'string',
    number: (value: any) => !isNaN(Number(value)),
  }
}

export default Rules
