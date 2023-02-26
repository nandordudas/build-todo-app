import type { NextFunction, Request, Response } from 'express'

import type BaseRepository from '../Repositories/BaseRepository'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'
import type Validateable from '../Utilities/Validators/Validateable'

abstract class BaseController<T extends BaseModelType, V extends Payload, R extends Validateable> {
  protected repository: BaseRepository<T, V>
  protected validator: R

  constructor(repository: BaseRepository<T, V>, validator: R) {
    this.repository = repository
    this.validator = validator
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
