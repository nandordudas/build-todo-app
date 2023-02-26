import * as dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'

import Database from './src/Database/Database'
import errorMiddleware from './src/Middleware/error'
import TodoRouter from './src/Routers/TodoRouter'
import EnvValidator from './src/Utilities/Validators/EnvValidator'

class Application {
  public static async main() {
    dotenv.config()

    const envValidator = new EnvValidator()

    envValidator.validate(process.env)

    const app = express()
    const db = Database.getInstance()
    const todoRouter = new TodoRouter().router

    if (!db.isConnected())
      throw new Error('Database connection failed.')

    // eslint-disable-next-line no-console
    console.log('⚡️[database]: Database is connected successfully.')

    return app
      .use(json(), urlencoded({ extended: true }))
      .use('/', todoRouter)
      .use(errorMiddleware)
  }
}

Application.main()
  .then((app) => {
    const { PROTOCOL, HOST, PORT } = process.env

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
    })
  })
  .catch(console.error)
