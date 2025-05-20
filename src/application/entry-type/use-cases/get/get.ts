import type { EntryType } from '../../domain/entry-type'
import { type Either, left, right } from '@/core/logic/either'
import { EntryTypeNotFoundError } from '../@errors/EntryTypeNotFoundError'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'

export type GetEntryTypeRequest = { id: string }

type GetEntryTypeResponse = Either<Error, EntryType>

type GetEntryTypeProps = {
  entryTypesRepository: IEntryTypesRepository
}

export class GetEntryType {
  private entryTypesRepository: IEntryTypesRepository
  constructor(props: GetEntryTypeProps) {
    this.entryTypesRepository = props.entryTypesRepository
  }

  async execute({ id }: GetEntryTypeRequest): Promise<GetEntryTypeResponse> {
    const entryType = await this.entryTypesRepository.findById(id)
    if (!entryType) {
      return left(new EntryTypeNotFoundError())
    }
    return right(entryType)
  }
}
