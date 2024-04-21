import { Entry } from '../domain/entry'

export interface IEntriesRepository {
  create(entry: Entry): Promise<void>
  getFarmByUserId(userId: string): Promise<string | null>
  getAllByUserId(userId: string): Promise<Entry[]>
}
