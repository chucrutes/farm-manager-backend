import { Entry } from '../../domain/entry'
import { IEntriesRepository } from '../IEntriesRepository'

export class InMemoryEntriesRepository implements IEntriesRepository {
  public entries: Entry[] = []

  async create(user: Entry): Promise<void> {
    this.entries.push(user)
  }
}
