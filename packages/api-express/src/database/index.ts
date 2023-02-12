import { Pool } from 'pg'

import { getConnectionData } from './database.utils'

const pool = new Pool(
  getConnectionData(),
)

export default {
  query: (text: string, params?: string[]) => pool.query(text, params),
}
