import { Entry } from '../../domain/entry'
import { prismaClient } from '@/infra/prisma/client'
import { EntryMapper } from '../../mappers/entry-mapper'
import { IEntriesRepository } from '../IEntriesRepository'

export class PrismaEntriesRepository implements IEntriesRepository {
  async create(entry: Entry): Promise<void> {
    const data = await EntryMapper.toPersistence(entry)

    await prismaClient.entry.create({
      data
    })
  }

  async getAllByFarmId(farmId: string): Promise<Entry[]> {
    if (!farmId) return []
    const entries = await prismaClient.entry.findMany({
      where: {
        farm_id: farmId
      },
      orderBy: {
        updated_at: 'desc'
      }
    })

    return entries.map(EntryMapper.toDomain)
  }

  async totalRevenueByFarm(farmId: string): Promise<number | null> {
    const totalSum = await prismaClient.entry.aggregate({
      _sum: {
        total: true
      },
      where: {
        farm_id: farmId,
        category: { not: 'EXPENSE' }
      }
    })

    const totalSubtract = await prismaClient.entry.aggregate({
      _sum: {
        total: true
      },
      where: {
        farm_id: farmId,
        category: 'EXPENSE'
      }
    })

    if (totalSum._sum.total === null || totalSubtract._sum.total === null)
      return null
    const result = totalSum._sum.total - totalSubtract._sum.total

    return result
  }
}
