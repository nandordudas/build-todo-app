import type BaseModel from '../Models/BaseModel'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'

abstract class BaseRepository<T extends BaseModelType, V extends Payload> {
  protected model: BaseModel<T, V>

  constructor(model: BaseModel<T, V>) {
    this.model = model
  }

  public abstract getAll(_limit: number, _offset: number): Promise<T[]>

  public abstract create(_payload: V): Promise<T | undefined>

  public abstract getById(_id: string): Promise<T>

  public abstract update(_id: string, _payload: V): Promise<T | undefined>

  public abstract delete(_id: string): Promise<boolean>
}

export default BaseRepository
