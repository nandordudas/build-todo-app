import type { PoolConfig } from 'pg'

export const getConnectionData = (): PoolConfig => {
  const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env
  const port = Number(PGPORT)

  if (isNaN(port)) {
    console.error('The given port is invalid')
    process.exit(1)
  }

  return {
    user: PGUSER,
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port,
  }
}
