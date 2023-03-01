import express, { json, urlencoded } from 'express'

import Database from '~/Database/Database'
import errorMiddleware from '~/Middleware/error'
import TodoRouter from '~/Routers/TodoRouter'

export class Application {
  public static main() {
    const db = Database.getInstance()

    if (!db.isConnected())
      throw new Error('Database connection failed.')

    // eslint-disable-next-line no-console
    console.log('⚡️[database]: Database is connected successfully.')

    const app = express()
    const { router: todoRouter } = new TodoRouter()

    return app
      .use(json(), urlencoded({ extended: true }))
      .use('/', todoRouter)
      .use(errorMiddleware)
  }
}
