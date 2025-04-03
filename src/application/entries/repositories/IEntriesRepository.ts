import type { EntryListOptions, EntryListResponse } from '../@types'
import type { Entry, Relations } from '../domain/entry'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { Categories } from '../domain/@types/categories.enum'

type Range = {
  min: Date
  max: Date
}

export type DataByCategory = {
  category: Categories
  sum: number
}

export interface IEntriesRepository extends ICrudRepository<Entry, Relations> {
  getAllByFarmId(
    farmId: string,
    options?: EntryListOptions
  ): Promise<EntryListResponse>
  getOpenEntriesRangeByFarmId(farmId: string): Promise<Range>
  totalRevenueByFarm(farmId: string): Promise<number | null>
  getDataByCategory(
    farmId: string,
    registerId: string | null
  ): Promise<DataByCategory[]>
}
