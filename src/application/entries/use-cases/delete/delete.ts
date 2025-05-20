import { type Either, right } from '@/core/logic/either'
import type { IEntriesRepository } from '../../repositories/IEntriesRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'

export type DeleteEntryRequest = {
  ids: string[] | string
  userId: string
}
type DeleteEntryResponse = Either<Error, null>

type DeleteEntryProps = {
  entriesRepository: IEntriesRepository
  farmsRepository: IFarmsRepository
}

export class DeleteEntry {
  private entriesRepository: IEntriesRepository
  constructor(props: DeleteEntryProps) {
    this.entriesRepository = props.entriesRepository
  }

  async execute({ ids }: DeleteEntryRequest): Promise<DeleteEntryResponse> {
    const _ids = Array.isArray(ids) ? ids : [ids]
    await this.entriesRepository.deleteMany(_ids)
    return right(null)
  }
}
