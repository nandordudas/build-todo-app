import BaseError from './BaseError'

class ResponseError extends BaseError {
  constructor(status: number, message: string) {
    super(status, message)
  }
}

export default ResponseError
