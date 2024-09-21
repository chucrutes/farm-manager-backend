import { Entry } from '../domain/entry'

export interface IEntriesRepository {
  create(entry: Entry): Promise<void>
  getAllByFarmId(userId: string): Promise<Entry[]>
  totalRevenueByFarm(farmId: string): Promise<number | null>
}
