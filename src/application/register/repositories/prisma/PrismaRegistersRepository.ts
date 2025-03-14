import { prismaClient } from '@/infra/prisma/client'
import { LANG_ENTITY, type Register } from '../../domain/register'
import { RegisterMapper } from '../../mappers/register-mapper'
import type { IRegistersRepository } from '../IRegistersRepository'
import {
  Categories,
  type Prisma,
  type PrismaPromise,
  type Register as PrismaRegister,
} from '@prisma/client'
import type { Pagination, PaginationMetadata } from '@/application/@types'
import { buildMetadata, buildPagination } from '@/utils/pagination'
import type { IncludeRelations, RegisterListOptions } from '../../@types'

const dbRegisterClient = prismaClient.register
type RegisterInclude = Prisma.RegisterInclude

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
    await prismaClient.$transaction([
      this.createRegister(register),
      this.updateEntries(register.id),
    ])
  }

  async update(register: Register): Promise<void> {
    const data = RegisterMapper.toPersistence(register)

    await dbRegisterClient
      .update({
        where: { id: register.id },
        data: {
          ...data,
        },
      })
      .catch(() => {
        throw new Error(`Error on update ${LANG_ENTITY}`)
      })
  }
  async findById(id: string): Promise<Register | null> {
    const register = await dbRegisterClient.findUnique({
      where: {
        id,
      },
    })

    if (!register) return null

    return RegisterMapper.toDomain(register)
  }

  async getAllByFarmId(
    farmId: string,
    options?: RegisterListOptions,
  ): Promise<{ data: Register[]; metadata: PaginationMetadata }> {
    const include = this.buildInclude(options?.includes)
    const { skip, take, orderBy } = buildPagination(options?.pagination)

    const [data, count] = await prismaClient.$transaction([
      prismaClient.register.findMany({
        where: {
          farm_id: farmId,
        },
        include,
        skip,
        take,
        orderBy,
      }),
      prismaClient.register.count({
        where: {
          farm_id: farmId,
        },
      }),
    ])

    const metadata = buildMetadata(count, data.length, options?.pagination)

    return { data: data.map(RegisterMapper.toDomain), metadata }
  }

  createRegister(register: Register) {
    const data = RegisterMapper.toPersistence(register)

    return dbRegisterClient.create({
      data,
    })
  }
  updateEntries(registerId: string) {
    return prismaClient.entry.updateMany({
      where: {
        register_id: null,
        type: {
          category: {
            not: Categories.ASSET,
          },
        },
      },
      data: {
        register_id: registerId,
        deleted_at: new Date(),
      },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await dbRegisterClient.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }

  async restoreEntriesByRegister(register: Register): Promise<void> {
    await prismaClient.$transaction([
      prismaClient.entry.updateMany({
        where: {
          register_id: register.id,
        },
        data: {
          register_id: null,
          deleted_at: null,
        },
      }),
      prismaClient.register.delete({
        where: {
          id: register.id,
        },
      }),
    ])
  }

  buildInclude(includeRelations?: IncludeRelations): RegisterInclude {
    const include: RegisterInclude = {}
    if (!includeRelations) {
      return include
    }

    for (const key of Object.keys(
      includeRelations,
    ) as (keyof IncludeRelations)[]) {
      switch (key) {
        case 'farm':
          include.farm = true
          break
      }
    }

    return include
  }
}
