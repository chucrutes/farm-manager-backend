import type { ListResponse, PaginationMetadata } from '@/application/@types'
import type { EntryType } from '../../domain/entry-type'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { left, right, type Either } from '@/core/logic/either'
import { FarmNotFoundError } from '@/application/farms/use-cases/@errors/FarmNotFoundError'

export type ListEntryTypeRequest = {
  userId: string
}

type RightResponse = ListResponse<EntryType>

type ListEntryTypeResponse = Either<Error, RightResponse>

type ListEntryTypeProps = {
  entryTypesRepository: IEntryTypesRepository
  farmsRepository: IFarmsRepository
}

export class ListEntryType {
  private entryTypesRepository: IEntryTypesRepository
  private farmsRepository: IFarmsRepository
  constructor(props: ListEntryTypeProps) {
    this.entryTypesRepository = props.entryTypesRepository
    this.farmsRepository = props.farmsRepository
  }

  async execute({
    userId,
  }: ListEntryTypeRequest): Promise<ListEntryTypeResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)

    if (!farm) {
      return left(new FarmNotFoundError())
    }
    const farmId = farm.id
    const entryTypes = await this.entryTypesRepository.getAllByFarmId(farmId, {
      farm: true,
    })

    return right(entryTypes)
  }
}
