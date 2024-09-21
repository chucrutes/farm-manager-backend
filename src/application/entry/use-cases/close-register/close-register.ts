import { Entry } from '../../domain/entry'
import { types } from '../../domain/@types/types.enum'
import { Either, left, right } from '@/core/logic/either'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'

export type CloseRegisterRequest = {
  userId: string
}

type CloseRegisterResponse = Either<Error, string>

export class CloseRegister {
  constructor(private readonly entriesRepository: IEntriesRepository) {}

  async execute({
    userId,
  }: CloseRegisterRequest): Promise<CloseRegisterResponse> {
    const farmId = await this.entriesRepository.getFarmByUserId(userId)

    if (!farmId) return left(new Error('No farm Id'))

    const total = await this.entriesRepository.totalRevenueByFarm(farmId)

    if (total === null) return right('')

    await this.entriesRepository.deleteEntries(farmId)
    const entry = Entry.create({
      description: 'Saldo após fechamento de caixa',
      farmId,
      price: total,
      total,
      quantity: 1,
      type: types[6].name,
      category: types[6].category,
    }).value as Entry

    await this.entriesRepository.create(entry)

    return right('')
  }
}
