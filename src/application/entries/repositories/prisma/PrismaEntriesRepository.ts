import { Prisma } from '@prisma/client'
import { Entry, Relations } from '../../domain/entry'
import { prismaClient } from '@/infra/prisma/client'
import { EntryMapper } from '../../mappers/entry-mapper'
import { IEntriesRepository } from '../IEntriesRepository'
import { IncludeRelations } from '@/application/entry-type/repositories/IEntryTypesRepository'

type EntryInclude = Prisma.EntryInclude

export class PrismaEntriesRepository implements IEntriesRepository {
  async createOrUpdate(entity: Entry): Promise<void> {
    const entityFound = await this.findById(entity.id)

    if (entityFound) {
      await this.update(entity)
      return
    }

    await this.create(entity)
  }

  async create(entry: Entry): Promise<void> {
    const data = await EntryMapper.toPersistence(entry)

    await prismaClient.entry.create({
      data
    })
  }
  async update(entry: Entry): Promise<void> {
    const data = await EntryMapper.toPersistence(entry)

    await prismaClient.entry.update({
      data,
      where: {
        id: data.id
      }
    })
  }

  async findById(id: string): Promise<Entry | null> {
    const farm = await prismaClient.entry.findUnique({
      where: {
        id
      }
    })

    if (!farm) return null

    return EntryMapper.toDomain(farm)
  }

  async getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations
  ): Promise<Entry[]> {
    const include = this.buildInclude(includeRelations)
    const entries = await prismaClient.entry.findMany({
      where: {
        farm_id: farmId
      },
      include,
      orderBy: {
        updated_at: 'desc'
      }
    })

    return entries.map(EntryMapper.toDomain)
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.entry.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
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

  buildInclude(includeRelations?: IncludeRelations): EntryInclude {
    const include: EntryInclude = {}
    if (!includeRelations) {
      return include
    }

    for (const key of Object.keys(includeRelations) as (keyof Relations)[]) {
      switch (key) {
        case 'type':
          include.type = true
          break
        case 'farm':
          include.farm = true
          break
      }
    }

    return include
  }
}
