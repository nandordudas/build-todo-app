import dotenv from 'dotenv'

import { Application } from '~/application'
import EnvValidator from '~/Utilities/Validators/EnvValidator'

import { logger } from './logger'

dotenv.config()

new EnvValidator().validate(process.env)

const { PROTOCOL, HOST, PORT } = process.env

Application.main().listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
})
