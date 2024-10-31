import { prismaClient } from '@/infra/prisma/client'
import { LANG_ENTITY, type Register } from '../../domain/register'
import { RegisterMapper } from '../../mappers/register-mapper'
import type { IRegistersRepository } from '../IRegistersRepository'

const dbRegisterClient = prismaClient.register

export default class PrismaRegistersRepository implements IRegistersRepository {
  async createOrUpdate(entity: Register): Promise<void> {
    const entityFound = await this.findById(entity.id)

    if (entityFound) {
      await this.update(entity)
      return
    }

    await this.create(entity)
  }

  async create(register: Register): Promise<void> {
    const data = RegisterMapper.toPersistence(register)

    await dbRegisterClient.create({
      data
    })
  }

  async update(register: Register): Promise<void> {
    const data = RegisterMapper.toPersistence(register)

    await dbRegisterClient
      .update({
        where: { id: register.id },
        data: {
          ...data
        }
      })
      .catch(() => {
        throw new Error(`Error on update ${LANG_ENTITY}`)
      })
  }
  async findById(id: string): Promise<Register | null> {
    const register = await dbRegisterClient.findUnique({
      where: {
        id
      }
    })

    if (!register) return null

    return RegisterMapper.toDomain(register)
  }
  async deleteMany(ids: string[]): Promise<void> {
    await dbRegisterClient.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }
}
