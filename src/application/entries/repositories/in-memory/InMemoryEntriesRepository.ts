import type { PartialIncludes } from '@/core/domain/entity'
import type { Entry, Relations } from '../../domain/entry'
import type { DataByCategory, IEntriesRepository } from '../IEntriesRepository'
import { EntryListResponse } from '../../@types'

export class InMemoryEntriesRepository implements IEntriesRepository {
  getOpenEntriesRangeByFarmId(
    farmId: string,
  ): Promise<{ min: Date; max: Date }> {
    throw new Error('Method not implemented.')
  }
  getDataByCategory(
    farmId: string,
    registerId: string | null,
  ): Promise<DataByCategory[]> {
    throw new Error('Method not implemented.')
  }
  public entries: Entry[] = []

  createOrUpdate(entity: Entry): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async create(user: Entry): Promise<void> {
    this.entries.push(user)
  }
  findById(
    id: string,
    includeRelations?: PartialIncludes<Relations> | undefined,
  ): Promise<Entry | null> {
    throw new Error('Method not implemented.')
  }
  deleteMany(ids: string[]): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getAllByFarmId(farmId: string): Promise<EntryListResponse> {
    throw new Error('Method not implemented.')
  }
  getAllByUserId(userId: string): Promise<Entry[]> {
    throw new Error('Method not implemented.')
  }
  totalRevenueByFarm(farmId: string): Promise<number | null> {
    throw new Error('Method not implemented.')
  }
}
