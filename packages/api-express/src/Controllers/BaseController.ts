import type { NextFunction, Request, Response } from 'express'

import type BaseRepository from '../Repositories/BaseRepository'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'

abstract class BaseController<T extends BaseModelType, V extends Payload> {
  protected repository: BaseRepository<T, V>

  constructor(repository: BaseRepository<T, V>) {
    this.repository = repository
  }

  public abstract index(
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined>

  public abstract show(
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined>

  public abstract store(
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined>

  public abstract update(
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined>

  public abstract destroy(
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined>
}

export default BaseController
