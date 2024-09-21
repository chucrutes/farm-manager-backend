import { z } from 'zod'
import { Entry } from '../../domain/entry'
import { Either, left, right } from '@/core/logic/either'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'
import {
  Types,
  findTypeByKey,
  typeSchema,
  types,
} from '../../domain/@types/types.enum'
import { Categories } from '../../domain/@types/categories.enum'
import { log } from 'console-log-colors'

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

type CreateEntryResponse = Either<Error, Entry[]>

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

    const entriesOrError: Either<Error, Entry>[] = [
      Entry.create({
        farmId,
        type: typeFound.name,
        category: typeFound.category,
        ...request,
      }),
    ]

    const entries: Entry[] = []

    console.log(type)
    console.log(typeFound.category)

    if (typeFound.category === Categories.ASSET) {
      entriesOrError.push(
        Entry.create({
          farmId,
          type: types[7].name,
          category: types[7].category,
          ...request,
        }),
      )
    }

    for (const iterator of entriesOrError) {
      if (iterator.isLeft()) {
        return left(iterator.value)
      }

      entries.push(iterator.value)
    }

    const createEntriesPromises = entries.map((entry) => {
      this.entriesRepository.create(entry)
    })

    await Promise.all(createEntriesPromises)

    return right(entries)
  }
}
