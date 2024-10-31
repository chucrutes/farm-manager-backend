import { EntryType } from '../../domain/entry-type'
import { type Either, left, right } from '@/core/logic/either'
import type { EntryTypeProps } from '../../domain/entry-type.schema'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'

export type CreateOrUpdateEntryTypeRequest = EntryTypeProps & {
  _id?: string
  userId: string
}

type CreateOrUpdateEntryTypeResponse = Either<Error, EntryType>

type CreateOrUpdateEntryTypeProps = {
  entryTypesRepository: IEntryTypesRepository
  farmsRepository: IFarmsRepository
}

export class CreateOrUpdateEntryType {
  private entryTypesRepository: IEntryTypesRepository
  private farmsRepository: IFarmsRepository
  constructor(props: CreateOrUpdateEntryTypeProps) {
    this.entryTypesRepository = props.entryTypesRepository
    this.farmsRepository = props.farmsRepository
  }

  async execute({
    _id,
    userId,
    ...props
  }: CreateOrUpdateEntryTypeRequest): Promise<CreateOrUpdateEntryTypeResponse> {
    let entryTypeExists: EntryType | null = null

    const farm = await this.farmsRepository.getFarmByUserId(userId)

    if (!farm) {
      throw new Error('no farm id')
    }

    if (_id) {
      entryTypeExists = await this.entryTypesRepository.findById(_id)
    }

    const entryTypeOrError = EntryType.create(props, _id, { farm })

    if (entryTypeOrError.isLeft()) {
      return left(entryTypeOrError.value)
    }

    const entryType = entryTypeOrError.value
    await this.entryTypesRepository.createOrUpdate(entryType)
    return right(entryType)
  }
}
