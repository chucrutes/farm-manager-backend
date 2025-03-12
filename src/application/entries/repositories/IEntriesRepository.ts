import type { PartialIncludes } from '@/core/domain/entity'
import type { Entry, Relations } from '../domain/entry'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { Pagination } from '@/application/@types'
import type { Register } from '@/application/register/domain/register'
import type { Categories } from '../domain/@types/categories.enum'

type Range = {
  min: Date
  max: Date
}

export type DataByCategory = {
  category: Categories
  sum: number
}

type IncludeRelations = PartialIncludes<Relations>
export interface IEntriesRepository extends ICrudRepository<Entry, Relations> {
  getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations,
    pagination?: Pagination,
  ): Promise<Entry[]>
  getOpenEntriesRangeByFarmId(farmId: string): Promise<Range>
  totalRevenueByFarm(farmId: string): Promise<number | null>
  getDataByCategory(
    farmId: string,
    registerId: string | null,
  ): Promise<DataByCategory[]>
}
