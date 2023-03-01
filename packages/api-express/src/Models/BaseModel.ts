import type { Modelable } from '~/Contracts/Modelable'
import Database from '~/Database/Database'
import type { BaseModelType, Payload, Query } from '~/types'

abstract class BaseModel<T extends BaseModelType, V extends Payload> implements Modelable<BaseModelType, Payload> {
  protected databaseConnection: Database

  constructor() {
    this.databaseConnection = Database.getInstance()
  }

  public abstract getAll(_limit: number, _offset: number): Promise<T[]>

  public abstract create(_payload: V): Promise<T | undefined>

  public abstract getById(_id: string): Promise<T | undefined>

  public abstract update(_id: string, _payload: V): Promise<T | undefined>

  public abstract delete(_id: string): Promise<boolean>

  protected async findFirst<T>(query: Query): Promise<T> {
    const { rows } = await this.databaseConnection.runQuery(query)

    if (!rows.length || !rows[0])
      throw new Error('Cannot find rows')

    const [first] = rows

    return first as T // QueryResult
  }
}

export default BaseModel
