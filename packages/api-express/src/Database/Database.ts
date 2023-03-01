import type { ConnectionConfig, PoolClient, QueryResultRow } from 'pg'
import { Pool } from 'pg'

import type { Query } from '~/types'

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

  /**
   *
   * @example
   *
   * ```ts
   * const db = new Database()
   *
   * await db.useTransaction(async () => 'yaaay').catch(console.error)
   * ```
   */
  public async useTransaction(cb: () => Promise<void>) {
    const promiseChain = [
      this.startTransaction(),
      cb(),
      this.commit(),
    ]

    return Promise.all(promiseChain).catch(this.rollback)
  }

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
    if (!process.env?.PGPORT)
      throw new Error('The given port is invalid!')

    const { PGPORT, PGUSER, PGHOST, PGDATABASE, PGPASSWORD } = process.env

    return {
      user: PGUSER,
      host: PGHOST,
      database: PGDATABASE,
      password: PGPASSWORD,
      port: +PGPORT,
    }
  }
}

export default Database
