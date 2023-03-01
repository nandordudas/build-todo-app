import type { ErrorRequestHandler } from 'express'

import { HttpStatusCodes } from '~/Enums/HttpStatusCodes'
import { logger } from '~/logger'
import type BaseError from '~/Utilities/Errors/BaseError'

const errorMiddleware: ErrorRequestHandler = (error: BaseError, _request, response, _next) => {
  logger.error(error.message)

  return response.status(error.status || HttpStatusCodes.SERVER_ERROR).send({
    status: 'FAILED',
    error: {
      message: error?.message || error,
    },
  })
}

export default errorMiddleware
