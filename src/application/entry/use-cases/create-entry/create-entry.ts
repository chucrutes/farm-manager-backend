import { z } from 'zod'
import { Entry } from '../../domain/entry'
import { Either, left, right } from '@/core/logic/either'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'
import { findTypeByKey, typeSchema } from '../../domain/@types/types.enum'

export const ItemSchema = z.object({
  description: z.string().min(1),
  quantity: z.number(),
  price: z.number(),
  total: z.number(),
  type: typeSchema,
})

type IItem = z.infer<typeof ItemSchema>
export type CreateEntryRequest = IItem & {
  userId: string
}

type CreateEntryResponse = Either<Error, Entry>

export class CreateEntry {
  constructor(private readonly entriesRepository: IEntriesRepository) {}

  async execute({
    type,
    userId,
    ...request
  }: CreateEntryRequest): Promise<CreateEntryResponse> {
    const farmId = await this.entriesRepository.getFarmByUserId(userId)

    const typeFound = findTypeByKey(type.key)
    if (!typeFound) {
      throw new Error('type not found')
    }

    if (!farmId) {
      throw new Error('no farm id')
    }

    type.category
    const entryOrError = Entry.create({
      farmId,
      type: typeFound.name,
      category: typeFound.category,
      ...request,
    })

    if (entryOrError.isLeft()) {
      return left(entryOrError.value)
    }

    const entry = entryOrError.value
    await this.entriesRepository.create(entry)

    return right(entry)
  }
}
