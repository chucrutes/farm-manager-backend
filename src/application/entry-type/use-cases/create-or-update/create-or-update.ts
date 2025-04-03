import { EntryType } from '../../domain/entry-type'
import { type Either, left, right } from '@/core/logic/either'
import { Categories, type EntryTypeProps } from '../../domain/entry-type.schema'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { EntryTypeWithTheSameNameError } from '../@errors/EntryTypeWithTheSameNameError'
import { EntryNotFoundError } from '@/application/entries/use-cases/EntryNotFoundError'
import { ExpenseShouldNotHaveCommissionError } from '../@errors/ExpenseShouldNotHaveCommissionError'

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
      if (!entryTypeExists) {
        return left(new EntryNotFoundError())
      }
    }

    const entryTypeByName = await this.entryTypesRepository.findByFarmAndName(
      farm.id,
      props.name
    )

    if (entryTypeByName && entryTypeByName.id !== _id) {
      return left(new EntryTypeWithTheSameNameError())
    }

    if (props.category === Categories.EXPENSE && props.commission) {
      return left(new ExpenseShouldNotHaveCommissionError())
    }

    const entryTypeOrError = EntryType.create(
      props,
      _id,
      {
        createdAt: entryTypeExists?.timestamps?.createdAt || new Date(),
        updatedAt: entryTypeExists?.timestamps?.updatedAt || new Date()
      },
      { farm }
    )

    if (entryTypeOrError.isLeft()) {
      return left(entryTypeOrError.value)
    }

    const entryType = entryTypeOrError.value
    await this.entryTypesRepository.upsert(entryType)
    return right(entryType)
  }
}
