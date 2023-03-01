declare namespace NodeJS {
  export interface ProcessEnv {
    PGPORT?: string
    PGUSER?: string
    PGHOST?: string
    PGDATABASE?: string
    PGPASSWORD?: string
  }
}
