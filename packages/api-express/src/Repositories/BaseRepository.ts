import type BaseModel from '~/Models/BaseModel'
import type { BaseModelType, Payload } from '~/types'

abstract class BaseRepository<T extends BaseModelType, V extends Payload> {
  constructor(protected model: BaseModel<T, V>) {}

  public abstract getAll(_limit: number, _offset: number): Promise<T[]>

  public abstract create(_payload: V): Promise<T | undefined>

  public abstract getById(_id: string): Promise<T | undefined>

  public abstract update(_id: string, _payload: V): Promise<T | undefined>

  public abstract delete(_id: string): Promise<boolean>
}

export default BaseRepository
