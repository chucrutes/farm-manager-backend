import { prismaClient } from '@/infra/prisma/client'
import { EntryType, LANG_ENTITY } from '../../domain/entry-type'
import { IEntryTypesRepository } from '../IEntryTypesRepository'
import { EntryTypeMapper } from '../../mappers/entry-type.mapper'

const dbEntryTypeClient = prismaClient.entryType

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
      data
    })
  }

  async update(farm: EntryType): Promise<void> {
    const data = EntryTypeMapper.toPersistence(farm)

    await dbEntryTypeClient
      .update({
        where: { id: farm.id },
        data: {
          ...data
        }
      })
      .catch(() => {
        throw new Error(`Error on update ${LANG_ENTITY}`)
      })
  }
  async findById(id: string): Promise<EntryType | null> {
    const farm = await dbEntryTypeClient.findUnique({
      where: {
        id
      }
    })

    if (!farm) return null

    return EntryTypeMapper.toDomain(farm)
  }
  async deleteMany(ids: string[]): Promise<void> {
    await dbEntryTypeClient.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
