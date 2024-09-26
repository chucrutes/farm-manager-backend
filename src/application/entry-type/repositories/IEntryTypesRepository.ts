import { ICrudRepository } from '@/core/domain/ICrudRepository'
import { EntryType, Relations } from '../domain/entry-type'
import { PartialIncludes } from '@/core/domain/entity'

export type IncludeRelations = PartialIncludes<Relations>

export interface IEntryTypesRepository
  extends ICrudRepository<EntryType, Relations> {
  getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations
  ): Promise<EntryType[]>
}
