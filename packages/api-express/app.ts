import * as dotenv from 'dotenv'
import express, { json, urlencoded } from 'express'

import Database from './src/Database/Database'
import errorMiddleware from './src/Middleware/error'
import EnvValidator from './src/Utilities/Validators/EnvValidator'
import EnvFileSchema from './src/Utilities/Validators/Schema/EnvFileSchema'

class Application {
  public static async main() {
    dotenv.config()

    const envValidator = new EnvValidator(new EnvFileSchema().getSchema)

    envValidator.validate()

    const app = express()
    const db = Database.getInstance()

    if (!db.isConnected())
      throw new Error('Database connection failed.')

    // eslint-disable-next-line no-console
    console.log('⚡️[database]: Database is connected successfully.')

    return app
      .use(json(), urlencoded({ extended: true }))
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
