abstract class BaseError extends Error {
  public override name = 'BaseError'
  public status: number

  constructor(status: number, message: string) {
    super()

    this.status = status
    this.message = message
  }
}

export default BaseError
