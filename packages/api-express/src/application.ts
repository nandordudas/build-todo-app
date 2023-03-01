import express, { json, urlencoded } from 'express'
import morgan, { type StreamOptions } from 'morgan'

import Database from '~/Database/Database'
import errorMiddleware from '~/Middleware/error'
import TodoRouter from '~/Routers/TodoRouter'

import { logger } from './logger'

const stream: StreamOptions = {
  write: message => logger.http(message),
}

export class Application {
  public static main() {
    const db = Database.getInstance()

    if (!db.isConnected())
      throw new Error('Database connection failed.')

    logger.info('⚡️[database]: Database is connected successfully.')

    const app = express()
    const { router: todoRouter } = new TodoRouter()

    return app
      .use(
        json(),
        urlencoded({ extended: true }),
        morgan(':remote-addr :method :url :status :res[content-length] - :response-time ms', { stream }),
      )
      .use('/', todoRouter)
      .use(errorMiddleware)
  }
}
