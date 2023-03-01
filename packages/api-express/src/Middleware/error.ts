import type { ErrorRequestHandler } from 'express'

import { HttpStatusCodes } from '~/Enums/HttpStatusCodes'
import type BaseError from '~/Utilities/Errors/BaseError'

const errorMiddleware: ErrorRequestHandler = (error: BaseError, _request, response, _next) => {
  return response.status(error.status || HttpStatusCodes.SERVER_ERROR).send({
    status: 'FAILED',
    error: {
      message: error?.message || error,
    },
  })
}

export default errorMiddleware
