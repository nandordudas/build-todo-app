import type { NextFunction, Request, Response } from 'express'

import type BaseRepository from '../Repositories/BaseRepository'
import type BaseModelType from '../types/BaseModelType'
import type { Payload } from '../types/Payload'

abstract class BaseController<T extends BaseModelType, V extends Payload> {
  protected repository: BaseRepository<T, V>

  constructor(repository: BaseRepository<T, V>) {
    this.repository = repository
  }

  public index = async (
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined> => {
    throw new Error('Method not implemented.')
  }

  public show = async (
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined> => {
    throw new Error('Method not implemented.')
  }

  public store = async (
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined> => {
    throw new Error('Method not implemented.')
  }

  public update = async (
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined> => {
    throw new Error('Method not implemented.')
  }

  public destroy = async (
    _request: Request,
    _response: Response,
    _next: NextFunction): Promise<Response | undefined> => {
    throw new Error('Method not implemented.')
  }
}

export default BaseController
