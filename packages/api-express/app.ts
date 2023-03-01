import * as dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'

import Database from '~/Database/Database'
import errorMiddleware from '~/Middleware/error'
import TodoRouter from '~/Routers/TodoRouter'
import EnvValidator from '~/Utilities/Validators/EnvValidator'

dotenv.config()
new EnvValidator().validate(process.env)

class Application {
  public static main() {
    const db = Database.getInstance()

    if (!db.isConnected())
      throw new Error('Database connection failed.')

    // eslint-disable-next-line no-console
    console.log('⚡️[database]: Database is connected successfully.')

    const app = express()
    const { router: todoRouter } = new TodoRouter()

    app
      .use(json(), urlencoded({ extended: true }))
      .use('/', todoRouter)
      .use(errorMiddleware)

    return app
  }
}

const app = Application.main()
const { PROTOCOL, HOST, PORT } = process.env

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
})
