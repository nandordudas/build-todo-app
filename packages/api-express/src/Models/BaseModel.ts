import type Modelable from '../Contracts/Modelable'
import Database from '../Database/Database'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'

abstract class BaseModel<T extends BaseModelType, V extends Payload> implements Modelable<BaseModelType, Payload> {
  protected databaseConnection: Database

  constructor() {
    this.databaseConnection = Database.getInstance()
  }

  public abstract getAll(_limit: number, _offset: number): Promise<T[]>

  public abstract create(_payload: V): Promise<T | undefined>

  public abstract getById(_id: string): Promise<T>

  public abstract update(_id: string, _payload: V): Promise<T | undefined>

  public abstract delete(_id: string): Promise<boolean>
}

export default BaseModel
