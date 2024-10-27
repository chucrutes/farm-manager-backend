import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { EntryType, Relations } from '../domain/entry-type'
import type { PartialIncludes } from '@/core/domain/entity'

export type IncludeRelations = PartialIncludes<Relations>

export interface IEntryTypesRepository
  extends ICrudRepository<EntryType, Relations> {
  getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations
  ): Promise<EntryType[]>
}
