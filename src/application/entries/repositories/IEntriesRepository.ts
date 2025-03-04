import type { PartialIncludes } from '@/core/domain/entity'
import type { Entry, Relations } from '../domain/entry'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { Pagination } from '@/application/@types'

type IncludeRelations = PartialIncludes<Relations>
export interface IEntriesRepository extends ICrudRepository<Entry, Relations> {
  getAllByFarmId(
    userId: string,
    includeRelations?: IncludeRelations,
    pagination?: Pagination,
  ): Promise<Entry[]>
  totalRevenueByFarm(farmId: string): Promise<number | null>
}
