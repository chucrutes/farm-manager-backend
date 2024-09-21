import { EntryType } from '../../domain/entry-type'
import { Either, left, right } from '@/core/logic/either'
import { EntryTypeProps } from '../../domain/entry-type.schema'
import { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'

export type CreateOrUpdateEntryTypeRequest = EntryTypeProps & {
  id?: string
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
    id,
    userId,
    ...props
  }: CreateOrUpdateEntryTypeRequest): Promise<CreateOrUpdateEntryTypeResponse> {
    let entryTypeExists: EntryType | null = null

    const farm = await this.farmsRepository.getFarmByUserId(userId)

    if (!farm) {
      throw new Error('no farm id')
    }

    if (id) {
      entryTypeExists = await this.entryTypesRepository.findById(id)
    }

    const entryTypeOrError = EntryType.create(props, id, { farm })

    if (entryTypeOrError.isLeft()) {
      return left(entryTypeOrError.value)
    }

    const entryType = entryTypeOrError.value
    await this.entryTypesRepository.createOrUpdate(entryType)
    return right(entryType)
  }
}
