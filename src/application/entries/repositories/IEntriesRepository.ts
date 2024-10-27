import type { PartialIncludes } from '@/core/domain/entity'
import type { Entry, Relations } from '../domain/entry'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'

type IncludeRelations = PartialIncludes<Relations>
export interface IEntriesRepository extends ICrudRepository<Entry, Relations> {
  getAllByFarmId(
    userId: string,
    includeRelations?: IncludeRelations
  ): Promise<Entry[]>
  totalRevenueByFarm(farmId: string): Promise<number | null>
}
