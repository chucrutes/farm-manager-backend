import { Entry } from '../../domain/entry'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'

export type ListEntryRequest = {
  userId: string
}

type ListEntryResponse = Entry[]
export class ListEntry {
  constructor(private readonly entriesRepository: IEntriesRepository) {}

  async execute({ userId }: ListEntryRequest): Promise<ListEntryResponse> {
    const entries = await this.entriesRepository.getAllByUserId(userId)

    return entries
  }
}
