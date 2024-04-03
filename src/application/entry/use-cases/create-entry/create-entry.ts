import { Either, left, right } from '@/core/logic/either'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'
import { Entry } from '../../domain/entry'
import { EntryProps } from '../../domain/entry.schema'

export type CreateEntryRequest = EntryProps

type CreateEntryResponse = Either<Error, Entry>

export class CreateEntry {
  constructor(private readonly entrysRepository: IEntriesRepository) {}

  async execute(request: CreateEntryRequest): Promise<CreateEntryResponse> {
    const entryOrError = Entry.create({
      ...request
    })

    if (entryOrError.isLeft()) {
      return left(entryOrError.value)
    }

    const entry = entryOrError.value
    await this.entrysRepository.create(entry)

    return right(entry)
  }
}
