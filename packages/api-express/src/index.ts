import dotenv from 'dotenv'

import { Application } from '~/app'
import EnvValidator from '~/Utilities/Validators/EnvValidator'

dotenv.config()

new EnvValidator().validate(process.env)

const { PROTOCOL, HOST, PORT } = process.env

Application.main().listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
})
