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
    const farmId = await this.getFarmByUserId(userId)

    if (!farmId) return []
    const entries = await prismaClient.entry.findMany({
      where: {
        farm_id: farmId,
      },
    })

    return entries.map(EntryMapper.toDomain)
  }
}
