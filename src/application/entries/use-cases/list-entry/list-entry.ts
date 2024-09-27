import { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { Entry } from '../../domain/entry'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'

export type ListEntryRequest = {
  userId: string
}

type ListEntryResponse = {
  entries: Entry[]
  total?: number | null
}

type ListEntryAttributes = {
  entriesRepository: IEntriesRepository
  farmsRepository: IFarmsRepository
}

export class ListEntry {
  private entriesRepository: IEntriesRepository
  private farmsRepository: IFarmsRepository
  constructor(props: ListEntryAttributes) {
    this.entriesRepository = props.entriesRepository
    this.farmsRepository = props.farmsRepository
  }

  async execute({ userId }: ListEntryRequest): Promise<ListEntryResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)
    if (!farm)
      return {
        entries: [],
        total: 0
      }
    const farmId = farm.id
    const entries = await this.entriesRepository.getAllByFarmId(farmId)

    let total: number | null = null
    if (farm) {
      total = await this.entriesRepository.totalRevenueByFarm(farmId)
    }

    return { entries, total }
  }
}
