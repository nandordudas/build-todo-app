import BaseError from './BaseError'

class ValidationError extends BaseError {
  public override name = 'ValidationError'

  constructor(status: number, message: string) {
    super(status, message)
  }
}

export default ValidationError
