import * as dotenv from 'dotenv'
import type { Express } from 'express'
import express = require('express')


dotenv.config()

const app: Express = express()

const { PROTOCOL, HOST, PORT } = process.env

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
})
