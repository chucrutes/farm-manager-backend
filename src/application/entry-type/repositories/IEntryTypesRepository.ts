import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { EntryType, Relations } from '../domain/entry-type'
import type { PartialIncludes } from '@/core/domain/entity'

export type IncludeRelations = PartialIncludes<Relations>
export type DeleteByName = { name: string; farmId: string }
export interface IEntryTypesRepository
  extends ICrudRepository<EntryType, Relations> {
  getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations,
  ): Promise<EntryType[]>
  findByFarmAndName(farmId: string, name: string): Promise<EntryType | null>
  deleteManyByName(items: DeleteByName[]): Promise<void>
}
