import { Entry } from '../../domain/entry'
import { EntryNotFoundError } from '../EntryNotFoundError'
import type { EntryProps } from '../../domain/entry.schema'
import { type Either, left, right } from '@/core/logic/either'
import type { IEntriesRepository } from '../../repositories/IEntriesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import type { IEntryTypesRepository } from '@/application/entry-type/repositories/IEntryTypesRepository'
import { EntryTypeNotFoundError } from '@/application/entry-type/use-cases/@errors/EntryTypeNotFoundError'
import type { Id } from '@/application/@types'

export type CreateOrUpdateEntryRequest = Omit<EntryProps, 'afterTax'> & {
  userId: string
  type: Id
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
    type,
    userId,
    _id,
    ...props
  }: CreateOrUpdateEntryRequest): Promise<CreateOrUpdateEntryResponse> {
    let entryExists: Entry | null = null
    const farm = await this.farmsRepository.getFarmByUserId(userId)
    const _type = await this.entryTypesRepository.findById(type._id)

    if (!farm) {
      throw new Error('no farm id')
    }
    if (!_type) {
      return left(new EntryTypeNotFoundError())
    }

    if (_id) {
      entryExists = await this.entriesRepository.findById(_id, {
        register: true
      })

      if (!entryExists) {
        return left(new EntryNotFoundError())
      }
    }

    const entryOrError = Entry.create(
      props,
      _id,
      {
        createdAt: entryExists?.timestamps?.createdAt || new Date(),
        updatedAt: entryExists?.timestamps?.updatedAt || new Date()
      },
      {
        farm,
        type: _type,
        register: entryExists?.relations?.register ?? null
      }
    )

    if (entryOrError.isLeft()) {
      return left(entryOrError.value)
    }

    const entry = entryOrError.value

    await this.entriesRepository.upsert(entry)

    return right(entry)
  }
}
