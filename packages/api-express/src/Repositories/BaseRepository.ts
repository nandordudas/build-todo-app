import type BaseModel from '../Models/BaseModel'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'

abstract class BaseRepository<T extends BaseModelType, V extends Payload> {
  protected model: BaseModel<T, V>

  constructor(model: BaseModel<T, V>) {
    this.model = model
  }

  public getAll = async (_limit: number, _offset: number): Promise<T[]> => {
    throw new Error('Method not implemented.')
  }

  public create = (_payload: V): Promise<T | undefined> => {
    throw new Error('Method not implemented.')
  }

  public getById = (_id: string): Promise<T> => {
    throw new Error('Method not implemented.')
  }

  public update = (_id: string, _payload: V): Promise<T | undefined> => {
    throw new Error('Method not implemented.')
  }

  public delete = (_id: string): void => {
    throw new Error('Method not implemented.')
  }
}

export default BaseRepository
