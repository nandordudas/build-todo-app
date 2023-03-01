import type { RequestHandler, Response } from 'express'

import type BaseRepository from '~/Repositories/BaseRepository'
import type { BaseModelType, Payload } from '~/types'
import type { Validateable } from '~/Utilities/Validators/Validateable'

type RequestHandlerParams = Parameters<RequestHandler>

abstract class BaseController<
  T extends BaseModelType,
  V extends Payload,
  R extends Validateable,
  Res = Promise<Response | undefined | void>,
> {
  constructor(protected repository: BaseRepository<T, V>, protected validator: R) {}

  public abstract index(...params: RequestHandlerParams): Res

  public abstract show(...params: RequestHandlerParams): Res

  public abstract store(...params: RequestHandlerParams): Res

  public abstract update(...params: RequestHandlerParams): Res

  public abstract destroy(...params: RequestHandlerParams): Res
}

export default BaseController
