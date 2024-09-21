import { Entry } from '../../domain/entry'
import { IEntriesRepository } from '../IEntriesRepository'

export class InMemoryEntriesRepository implements IEntriesRepository {
  public entries: Entry[] = []

  async create(user: Entry): Promise<void> {
    this.entries.push(user)
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
