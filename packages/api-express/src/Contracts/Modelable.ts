export interface Modelable<V, T> {
  getAll(limit: number, offset: number): Promise<V[]>
  create(payload: T): Promise<V | undefined>
  getById(id: string): Promise<V | undefined>
  update(id: string, payload: T): Promise<V | undefined>
  delete(id: string): void
}
