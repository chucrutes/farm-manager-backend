import type { PartialIncludes } from '@/core/domain/entity'
import type { Entry, Relations } from '../domain/entry'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { Pagination } from '@/application/@types'
import type { Register } from '@/application/register/domain/register'

type Range = {
  min: Date,
  max: Date
}

type IncludeRelations = PartialIncludes<Relations>
export interface IEntriesRepository extends ICrudRepository<Entry, Relations> {
  getAllByFarmId(
    userId: string,
    includeRelations?: IncludeRelations,
    pagination?: Pagination,
  ): Promise<Entry[]>
  getOpenEntriesRangeByFarmId(farmId: string): Promise<Range>
  totalRevenueByFarm(farmId: string): Promise<number | null>
  setClosedRegister(register: Register): Promise<void>
}
