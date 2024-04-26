import { Entry } from '../../domain/entry'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'

export type ListEntryRequest = {
  userId: string
}

type ListEntryResponse = {
  entries: Entry[]
  total?: number | null
}
export class ListEntry {
  constructor(private readonly entriesRepository: IEntriesRepository) {}

  async execute({ userId }: ListEntryRequest): Promise<ListEntryResponse> {
    const entries = await this.entriesRepository.getAllByUserId(userId)
    const farmId = await this.entriesRepository.getFarmByUserId(userId)

    let total: number | null = null
    if (farmId) {
      total = await this.entriesRepository.totalRevenueByFarm(farmId)
    }

    return { entries, total }
  }
}
