import type { PartialIncludes } from './entity'

export interface ICrudRepository<Entity, Relations extends object> {
  upsert(entity: Entity): Promise<void>
  findById(
    id: string,
    includeRelations?: PartialIncludes<Relations>
  ): Promise<Entity | null>
  deleteMany(ids: string[]): Promise<void>
}
