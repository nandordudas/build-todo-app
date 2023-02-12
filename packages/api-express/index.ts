import * as dotenv from 'dotenv'
import type { Express, Request, Response } from 'express'
import express = require('express')

import db from './src/database'

dotenv.config()

const app: Express = express()

const { PROTOCOL, HOST, PORT } = process.env

app.get('/', async (req: Request, res: Response) => {
  const { rows } = await db.query('SELECT * FROM todos')

  res.send(rows)
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at ${PROTOCOL}://${HOST}:${PORT}`)
})
