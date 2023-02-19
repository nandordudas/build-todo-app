import type { ErrorRequestHandler } from 'express'

import HttpStatusCodes from '../Enums/HttpStatusCodes'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  return response.status(error?.status || HttpStatusCodes.SERVER_ERROR).send({
    status: 'FAILED',
    data: {
      error: error?.message || error,
    },
  })
}

export default errorMiddleware
