import BaseError from './BaseError'

class ResponseError extends BaseError {
  public override name = 'ResponseError'

  constructor(status: number, message: string) {
    super(status, message)
  }
}

export default ResponseError
