import { Roles } from '../../domain/farm.schema'
import { prismaClient } from '@/infra/prisma/client'
import { Farm, LANG_ENTITY } from '../../domain/farm'
import { IFarmsRepository } from '../IFarmsRepository'
import { FarmMapper } from '../../mappers/farm-mapper'

const dbFarmClient = prismaClient.farm

export default class PrismaFarmsRepository implements IFarmsRepository {
  async createOrUpdate(entity: Farm): Promise<void> {
    const entityFound = await this.findById(entity.id)

    if (entityFound) {
      await this.update(entity)
      return
    }

    await this.create(entity)
  }

  async create(farm: Farm): Promise<void> {
    const data = FarmMapper.toPersistence(farm)

    await dbFarmClient.create({
      data
    })
  }

  async update(farm: Farm): Promise<void> {
    const data = FarmMapper.toPersistence(farm)

    await dbFarmClient
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
  async findById(id: string): Promise<Farm | null> {
    const farm = await dbFarmClient.findUnique({
      where: {
        id
      }
    })

    if (!farm) return null

    return FarmMapper.toDomain(farm)
  }
  async deleteMany(ids: string[]): Promise<void> {
    await dbFarmClient.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }

  async addMember(userId: string, farmId: string, role: Roles) {
    await prismaClient.farmMembers.create({
      data: {
        user_id: userId,
        farm_id: farmId,
        role
      }
    })
  }

  async getFarmByUserId(userId: string): Promise<Farm | null> {
    const farm = await prismaClient.farmMembers.findFirst({
      where: {
        user_id: userId
      },
      include: {
        farm: true
      }
    })

    if (!farm) return null

    return FarmMapper.toDomain(farm.farm)
  }
}
