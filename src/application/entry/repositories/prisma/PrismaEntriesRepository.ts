import { Entry } from '../../domain/entry'
import { prismaClient } from '@/infra/prisma/client'
import { EntryMapper } from '../../mappers/entry-mapper'
import { IEntriesRepository } from '../IEntriesRepository'

export class PrismaEntriesRepository implements IEntriesRepository {
  async create(entry: Entry): Promise<void> {
    const data = await EntryMapper.toPersistence(entry)

    await prismaClient.entry.create({
      data,
    })
  }

  async getFarmByUserId(userId: string): Promise<string | null> {
    const farm = await prismaClient.farmMembers.findFirst({
      select: {
        farm_id: true,
      },
      where: {
        user_id: userId,
      },
    })

    if (!farm) return null

    return farm.farm_id
  }
  async getAllByUserId(userId: string): Promise<Entry[]> {
    const result = await prismaClient.entry.aggregate({
      _sum: {
        total: true,
      },
      where: {
        OR: [{ category: 'EXPENSE' }, { category: { not: 'EXPENSE' } }],
      },
    })

    console.log(result)
    const farmId = await this.getFarmByUserId(userId)

    if (!farmId) return []
    const entries = await prismaClient.entry.findMany({
      where: {
        farm_id: farmId,
      },
      orderBy: {
        updated_at: 'desc',
      },
    })

    return entries.map(EntryMapper.toDomain)
  }

  async totalRevenueByFarm(farmId: string): Promise<number | null> {
    const totalSum = await prismaClient.entry.aggregate({
      _sum: {
        total: true,
      },
      where: {
        farm_id: farmId,
        category: { not: 'EXPENSE' },
      },
    })

    const totalSubtract = await prismaClient.entry.aggregate({
      _sum: {
        total: true,
      },
      where: {
        farm_id: farmId,
        category: 'EXPENSE',
      },
    })

    if (totalSum._sum.total === null || totalSubtract._sum.total === null)
      return null
    const result = totalSum._sum.total - totalSubtract._sum.total

    return result
  }
}
