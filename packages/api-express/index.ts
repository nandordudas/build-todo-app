import * as dotenv from 'dotenv'
import type { Express, Request, Response } from 'express'
import express = require('express')

dotenv.config()

const app: Express = express()

const { PROTOCOL, HOST, PORT } = process.env

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, express')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
})
