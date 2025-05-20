import type { Entry } from '../../domain/entry'
import type { EntryListOptions } from '../../@types'
import type { ListResponse } from '@/application/@types'
import { left, right, type Either } from '@/core/logic/either'
import type { IEntriesRepository } from '../../repositories/IEntriesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { FarmNotFoundError } from '@/application/farms/use-cases/@errors/FarmNotFoundError'

export type ListEntryRequest = EntryListOptions & {
  userId: string
}

type RightResponse = ListResponse<Entry> & {
  total: number | null
}

type ListEntryResponse = Either<Error, RightResponse>

type ListEntryProps = {
  entriesRepository: IEntriesRepository
  farmsRepository: IFarmsRepository
}

export class ListEntry {
  private entriesRepository: IEntriesRepository
  private farmsRepository: IFarmsRepository
  constructor(props: ListEntryProps) {
    this.entriesRepository = props.entriesRepository
    this.farmsRepository = props.farmsRepository
  }

  async execute({
    userId,
    pagination,
    includes,
    removeDeletedAt,
  }: ListEntryRequest): Promise<ListEntryResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)
    if (!farm) {
      return left(new FarmNotFoundError())
    }
    const farmId = farm.id

    const data = await this.entriesRepository.getAllByFarmId(farmId, {
      includes,
      pagination,
      removeDeletedAt,
    })

    let total: number | null = null
    if (farm) {
      total = await this.entriesRepository.totalRevenueByFarm(farmId)
    }

    return right({ ...data, total })
  }
}
