import { type Either, right } from '@/core/logic/either'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'

export type DeleteEntryTypeRequest =  {
  ids: string[] | string
  userId: string
}
type DeleteEntryTypeResponse = Either<Error, null>

type DeleteEntryTypeProps = {
  entryTypesRepository: IEntryTypesRepository
  farmsRepository: IFarmsRepository
}

export class DeleteEntryType {
  private entryTypesRepository: IEntryTypesRepository
  constructor(props: DeleteEntryTypeProps) {
    this.entryTypesRepository = props.entryTypesRepository
  }

  async execute({
    ids,
  }: DeleteEntryTypeRequest): Promise<DeleteEntryTypeResponse> {
    const _ids = Array.isArray(ids) ? ids : [ids]
    await this.entryTypesRepository.deleteMany(_ids)
    return right(null)
  }
}
