import { EntryType } from '../../domain/entry-type'
import {
  IEntryTypesRepository,
  IncludeRelations
} from '../IEntryTypesRepository'

export class InMemoryEntryTypesRepository implements IEntryTypesRepository {
  constructor(public entryTypes: EntryType[] = []) {}
  async createOrUpdate(entity: EntryType): Promise<void> {
    const entityFound = await this.findById(entity.id)

    if (entityFound) {
      await this.update(entity)
      return
    }

    await this.create(entity)
  }

  async create(entryType: EntryType): Promise<void> {
    this.entryTypes.push(entryType)
  }
  async update(workspace: EntryType): Promise<void> {
    const index = this.entryTypes.findIndex(
      (entryTypeItem) => entryTypeItem.id === workspace.id
    )

    this.entryTypes[index] = workspace
  }
  async findById(id: string): Promise<EntryType | null> {
    const entryType = this.entryTypes.find((entryType) => entryType.id === id)

    if (!entryType) return null

    return entryType
  }
  async deleteMany(_ids: string[]): Promise<void> {}
  getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations
  ): Promise<EntryType[]> {
    throw new Error('Method not implemented.')
  }
}
