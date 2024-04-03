import { Entry } from '../domain/entry'

export interface IEntriesRepository {
  create(entry: Entry): Promise<void>
}
