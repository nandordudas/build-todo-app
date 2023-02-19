import type Modelable from '../Contracts/Modelable'
import Database from '../Database/Database'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'

abstract class BaseModel<T extends BaseModelType, V extends Payload> implements Modelable<BaseModelType, Payload> {
  protected databaseConnection: Database

  constructor() {
    this.databaseConnection = Database.getInstance()
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

export default BaseModel
