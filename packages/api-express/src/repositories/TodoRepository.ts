import TodoModel from '../models/TodoModel'
import type { TodoStatus } from '../types/TodoStatuses'

const getAllTodos = () => TodoModel.getAllTodos()

const getTodoById = (id: string) => TodoModel.getTodoById(id)

const setStatus = (id: string, status: TodoStatus = 'pending') => TodoModel.setStatus(id, status)

const addTodo = (title: string) => TodoModel.addTodo(title)

const updateTodo = (id: string, title: string) => TodoModel.updateTodo(id, title)

const deleteTodo = (id: string) => TodoModel.deleteTodo(id)

export default {
  addTodo: (title: string) => addTodo(title),
  getTodoById: (id: string) => getTodoById(id),
  setStatus: (id: string, status: TodoStatus = 'pending') => setStatus(id, status),
  getAllTodos: () => getAllTodos(),
  updateTodo: (id: string, title: string) => updateTodo(id, title),
  deleteTodo: (id: string) => deleteTodo(id),
}
