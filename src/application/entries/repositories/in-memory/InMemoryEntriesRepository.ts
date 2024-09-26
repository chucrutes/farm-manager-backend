import { PartialIncludes } from '@/core/domain/entity'
import { Entry, Relations } from '../../domain/entry'
import { IEntriesRepository } from '../IEntriesRepository'

export class InMemoryEntriesRepository implements IEntriesRepository {
  public entries: Entry[] = []

  createOrUpdate(entity: Entry): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async create(user: Entry): Promise<void> {
    this.entries.push(user)
  }
  findById(
    id: string,
    includeRelations?: PartialIncludes<Relations> | undefined
  ): Promise<Entry | null> {
    throw new Error('Method not implemented.')
  }
  deleteMany(ids: string[]): Promise<void> {
    throw new Error('Method not implemented.')
  }
  getAllByFarmId(userId: string): Promise<Entry[]> {
    throw new Error('Method not implemented.')
  }
  getAllByUserId(userId: string): Promise<Entry[]> {
    throw new Error('Method not implemented.')
  }
  totalRevenueByFarm(farmId: string): Promise<number | null> {
    throw new Error('Method not implemented.')
  }
}
