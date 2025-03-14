import { Categories, type Prisma } from '@prisma/client'
import type { Entry, Relations } from '../../domain/entry'
import { prismaClient } from '@/infra/prisma/client'
import { EntryMapper } from '../../mappers/entry-mapper'
import type { DataByCategory, IEntriesRepository } from '../IEntriesRepository'
import type { IncludeRelations } from '@/application/entry-type/repositories/IEntryTypesRepository'
import type { Register } from '@/application/register/domain/register'
import type { EntryListOptions, EntryListResponse } from '../../@types'
import type { PaginationMetadata } from '@/application/@types'
import { buildMetadata, buildPagination } from '@/utils/pagination'

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
      data,
    })
  }
  async update(entry: Entry): Promise<void> {
    const data = await EntryMapper.toPersistence(entry)

    await prismaClient.entry.update({
      data,
      where: {
        id: data.id,
      },
    })
  }

  async findById(id: string): Promise<Entry | null> {
    const farm = await prismaClient.entry.findUnique({
      where: {
        id,
      },
    })

    if (!farm) return null

    return EntryMapper.toDomain(farm)
  }

  async getAllByFarmId(
    farmId: string,
    options?: EntryListOptions,
  ): Promise<EntryListResponse> {
    const include = this.buildInclude(options?.includes)
    const { skip, take, orderBy } = buildPagination(options?.pagination)

    const where: Prisma.EntryWhereInput = {
      farm_id: farmId,
      deleted_at: {
        not: null,
      },
    }
    if (options?.removeDeletedAt) {
      where.deleted_at = null
    }

    const [data, count] = await prismaClient.$transaction([
      prismaClient.entry.findMany({
        where,
        include,
        skip,
        take,
        orderBy,
      }),
      prismaClient.entry.count({
        where: {
          farm_id: farmId,
        },
      }),
    ])

    const metadata = buildMetadata(count, data.length, options?.pagination)

    return { data: data.map(EntryMapper.toDomain), metadata }
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.entry.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }

  async totalRevenueByFarm(farmId: string): Promise<number | null> {
    const totalSum = await prismaClient.entry.aggregate({
      _sum: {
        after_tax: true,
      },
      where: {
        farm_id: farmId,
        deleted_at: null,
        type: {
          category: { not: Categories.EXPENSE },
        },
      },
    })

    const totalSubtract = await prismaClient.entry.aggregate({
      _sum: {
        after_tax: true,
      },
      where: {
        farm_id: farmId,
        deleted_at: null,
        type: {
          category: Categories.EXPENSE,
        },
      },
    })

    const totalSubtractParsed = totalSubtract?._sum.after_tax ?? 0
    const totalSumParsed = totalSum?._sum.after_tax ?? 0

    const result = totalSumParsed - totalSubtractParsed

    return result
  }

  async getOpenEntriesRangeByFarmId(farmId: string) {
    const result = await prismaClient.entry.aggregate({
      _min: {
        created_at: true,
      },
      _max: {
        created_at: true,
      },
      where: {
        register_id: null,
        farm_id: farmId,
      },
    })

    return {
      min: result._min.created_at as Date,
      max: result._max.created_at as Date,
    }
  }

  async setClosedRegister(register: Register): Promise<void> {
    if (!register.farm) return

    await prismaClient.entry.updateMany({
      where: {
        register_id: null,
        farm_id: register.farm.id,
      },
      data: {
        register_id: register.id,
        deleted_at: new Date(),
      },
    })
  }

  async getDataByCategory(
    farmId: string,
    registerId: string | null,
  ): Promise<DataByCategory[]> {
    const sumByCategory = await prismaClient.$queryRaw`
      SELECT entry_types.category, SUM(entries.after_tax) 
      FROM entries
      INNER JOIN entry_types ON entries.type_id = entry_types.id
      WHERE entries.deleted_at IS NULL
      AND entries.farm_id = ${farmId}
      GROUP BY entry_types.category;
    `

    return sumByCategory as DataByCategory[]
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
        case 'register':
          include.register = true
      }
    }

    return include
  }
}
