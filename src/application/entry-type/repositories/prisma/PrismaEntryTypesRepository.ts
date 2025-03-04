import { prismaClient } from '@/infra/prisma/client'
import { type EntryType, LANG_ENTITY } from '../../domain/entry-type'
import type {
  DeleteByName,
  IEntryTypesRepository,
  IncludeRelations,
} from '../IEntryTypesRepository'
import { EntryTypeMapper } from '../../mappers/entry-type.mapper'
import type { Prisma } from '@prisma/client'
import type { Pagination, PaginationMetadata } from '@/application/@types'
import { buildMetadata, buildPagination } from '@/utils/pagination'

const dbEntryTypeClient = prismaClient.entryType

type EntryTypeInclude = Prisma.EntryTypeInclude

export default class PrismaEntryTypesRepository
  implements IEntryTypesRepository
{
  async createOrUpdate(entity: EntryType): Promise<void> {
    const entityFound = await this.findById(entity.id)

    if (entityFound) {
      await this.update(entity)
      return
    }

    await this.create(entity)
  }

  async create(farm: EntryType): Promise<void> {
    const data = EntryTypeMapper.toPersistence(farm)

    await dbEntryTypeClient.create({
      data,
    })
  }

  async update(farm: EntryType): Promise<void> {
    const data = EntryTypeMapper.toPersistence(farm)

    await dbEntryTypeClient
      .update({
        where: { id: farm.id },
        data: {
          ...data,
        },
      })
      .catch(() => {
        throw new Error(`Error on update ${LANG_ENTITY}`)
      })
  }
  async findById(id: string): Promise<EntryType | null> {
    const farm = await dbEntryTypeClient.findUnique({
      where: {
        id,
      },
    })

    if (!farm) return null

    return EntryTypeMapper.toDomain(farm)
  }
  async deleteMany(ids: string[]): Promise<void> {
    await dbEntryTypeClient.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }

  async getAllByFarmId(
    farmId: string,
    includeRelations?: IncludeRelations,
    pagination?: Pagination,
  ): Promise<{ data: EntryType[]; metadata: PaginationMetadata }> {
    const include = this.buildInclude(includeRelations)
    const { skip, take, orderBy } = buildPagination(pagination)

    const [data, count] = await prismaClient.$transaction([
      prismaClient.entryType.findMany({
        where: {
          farm_id: farmId,
        },
        include,
        skip,
        take,
        orderBy,
      }),
      prismaClient.entryType.count({
        where: {
          farm_id: farmId,
        },
      }),
    ])

    const metadata = buildMetadata(count, data.length, pagination)

    return { data: data.map(EntryTypeMapper.toDomain), metadata }
  }

  async findByFarmAndName(
    farmId: string,
    name: string,
  ): Promise<EntryType | null> {
    const data = await prismaClient.entryType.findUnique({
      where: {
        name_farm_id: {
          name,
          farm_id: farmId,
        },
      },
    })

    if (!data) return null

    return EntryTypeMapper.toDomain(data)
  }

  async deleteManyByName(items: DeleteByName[]): Promise<void> {
    try {
      const promises = items.map(({ farmId, name }) =>
        prismaClient.entryType.delete({
          where: {
            name_farm_id: {
              name,
              farm_id: farmId,
            },
          },
        }),
      )
      await Promise.all(promises)
    } catch (e) {
      // console.error(e)
    }
  }

  buildInclude(includeRelations?: IncludeRelations) {
    if (!includeRelations) return undefined
    const include: EntryTypeInclude = {}

    for (const key of Object.keys(
      includeRelations,
    ) as (keyof IncludeRelations)[]) {
      switch (key) {
        case 'farm':
          include.farm = true
          break
        default:
          break
      }
    }

    return include
  }
}
