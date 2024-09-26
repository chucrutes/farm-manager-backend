import { EntryType } from '../../domain/entry-type'
import { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'

export type ListEntryTypeRequest = {
  userId: string
}

type ListEntryTypeResponse = EntryType[]

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
    userId
  }: ListEntryTypeRequest): Promise<ListEntryTypeResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)
    if (!farm) {
      return []
    }
    const farmId = farm.id
    const entryTypes = await this.entryTypesRepository.getAllByFarmId(farmId)

    return entryTypes
  }
}
