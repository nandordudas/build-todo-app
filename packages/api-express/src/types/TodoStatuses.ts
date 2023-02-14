export const TodoStatuses = Object.freeze({
  pending: '1',
  completed: '2',
})

export type TodoStatus = keyof typeof TodoStatuses
