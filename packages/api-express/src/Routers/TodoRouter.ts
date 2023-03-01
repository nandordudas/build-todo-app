import { Router } from 'express'

import TodoController from '~/Controllers/TodoController'

class TodoRouter {
  public router: Router

  constructor(protected controller = new TodoController()) {
    this.router = Router()
    this.controller = controller

    this.initRoutes()
  }

  protected initRoutes = (): void => {
    this.router
      .get('/', this.controller.index)
      .post('/', this.controller.store)
      .get('/:id', this.controller.show)
      .patch('/:id', this.controller.update)
      .delete('/:id', this.controller.destroy)
  }
}

export default TodoRouter
