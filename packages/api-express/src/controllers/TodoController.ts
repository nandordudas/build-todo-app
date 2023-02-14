import type { Request, Response } from 'express'

import TodoRepository from '../repositories/TodoRepository'

const index = async (request: Request, response: Response) => {
  try {
    const data = await TodoRepository.getAllTodos()

    return response.status(200).send(data)
  }
  catch (error) {
    // TODO: Set an error-handler middleware
    console.error(error)
  }
}

const show = async (request: Request, response: Response) => {
  try {
    const { id } = request.params

    const data = await TodoRepository.getTodoById(id)

    return response.status(200).send(data)
  }
  catch (error) {
    // TODO: Set an error-handler middleware
    console.error(error)

    return response.status(404).send('NOT_FOUND')
  }
}

const store = async (request: Request, response: Response) => {
  try {
    const { title } = request.body

    const result = await TodoRepository.addTodo(title)

    return response.status(201).send(result)
  }
  catch (error) {
    // TODO: Set an error-handler middleware
    console.error(error)
  }
}

const update = async (request: Request, response: Response) => {
  try {
    const { id, title, status } = request.body

    await TodoRepository.updateTodo(id, title)

    await TodoRepository.setStatus(id, status)

    return response.status(200).send(await TodoRepository.getTodoById(id))
  }
  catch (error) {
    // TODO: Set an error-handler middleware
    console.error(error)
  }
}

const destroy = async (request: Request, response: Response) => {
  try {
    const { id } = request.params

    await TodoRepository.deleteTodo(id)

    return response.status(200)
  }
  catch (error) {
    // TODO: Set an error-handler middleware
    console.error(error)
  }
}

export default {
  index: (request: Request, response: Response) => index(request, response),
  show: (request: Request, response: Response) => show(request, response),
  store: (request: Request, response: Response) => store(request, response),
  update: (request: Request, response: Response) => update(request, response),
  destroy: (request: Request, response: Response) => destroy(request, response),
}
