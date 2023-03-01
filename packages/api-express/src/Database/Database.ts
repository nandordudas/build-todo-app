import type { ConnectionConfig, PoolClient, QueryResultRow } from 'pg'
import { Pool } from 'pg'

import type { Query } from '~/types'
import EnvValidator from '~/Utilities/Validators/EnvValidator'

class Database {
  public static instance: Database
  private pool: Pool
  private client?: PoolClient

  private constructor() {
    this.pool = new Pool(this.configure())
  }

  public static getInstance = () => Database.instance ??= new Database()

  public isConnected = () => Boolean(this.pool)

  public runQuery = async <T extends QueryResultRow>({ text, values }: Query) =>
    await this.pool.query<T>(text, values)

  public startTransaction = async () => {
    this.client = await this.pool.connect()

    if (!this.client)
      throw new Error('Cannot start transaction')

    await this.client.query('BEGIN')
  }

  public commit = async () => {
    if (!this.client)
      throw new Error('Transaction cannot be committed.')

    await this.client.query('COMMIT')
  }

  public rollback = async () => {
    if (!this.client)
      throw new Error('Transaction rollback cannot be performed.')

    await this.client.query('ROLLBACK')
  }

  public releaseClient = async () => {
    if (!this.client)
      throw new Error('Transaction client cannot be released.')

    this.client.release()
  }

  private configure = (): ConnectionConfig => {
    const { PGPORT, PGUSER, PGHOST, PGDATABASE, PGPASSWORD } = process.env

    const port = PGPORT ? EnvValidator.parsePort(PGPORT) : null

    if (!port)
      throw new Error('The given port is invalid!')

    return {
      user: PGUSER,
      host: PGHOST,
      database: PGDATABASE,
      password: PGPASSWORD,
      port,
    }
  }
}

export default Database
