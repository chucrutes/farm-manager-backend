import { Entry } from '../../domain/entry'
import { EntryProps } from '../../domain/entry.schema'
import { Either, left, right } from '@/core/logic/either'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'
import { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { IEntryTypesRepository } from '@/application/entry-type/repositories/IEntryTypesRepository'
import { EntryTypeNotFoundError } from '@/application/entry-type/use-cases/@errors/EntryTypeNotFoundError'

export type CreateOrUpdateEntryRequest = EntryProps & {
  userId: string
  typeId: string
  _id?: string
}

type CreateOrUpdateEntryResponse = Either<Error, Entry>

type CreateOrUpdateEntryProps = {
  entriesRepository: IEntriesRepository
  entryTypesRepository: IEntryTypesRepository
  farmsRepository: IFarmsRepository
}

export class CreateOrUpdateEntry {
  private entriesRepository: IEntriesRepository
  private entryTypesRepository: IEntryTypesRepository

  private farmsRepository: IFarmsRepository
  constructor(props: CreateOrUpdateEntryProps) {
    this.entriesRepository = props.entriesRepository
    this.entryTypesRepository = props.entryTypesRepository
    this.farmsRepository = props.farmsRepository
  }

  async execute({
    typeId,
    userId,
    _id,
    ...props
  }: CreateOrUpdateEntryRequest): Promise<CreateOrUpdateEntryResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)
    const type = await this.entryTypesRepository.findById(typeId)

    if (!farm) {
      throw new Error('no farm id')
    }
    if (!type) {
      return left(new EntryTypeNotFoundError())
    }

    const entryOrError = Entry.create(props, _id, { farm, type })

    if (entryOrError.isLeft()) {
      return left(entryOrError.value)
    }

    const entry = entryOrError.value
    await this.entriesRepository.createOrUpdate(entry)

    return right(entry)
  }
}
