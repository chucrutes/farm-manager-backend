export interface ICrudRepository<Entity> {
  createOrUpdate(entity: Entity): Promise<void>
  findById(id: string): Promise<Entity | null>
  deleteMany(ids: string[]): Promise<void>
}
