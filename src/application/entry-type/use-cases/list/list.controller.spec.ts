import { Roles } from '@/application/farms/domain/farm.schema'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import type { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { beforeAll, describe, expect, test } from 'vitest'
import { initEntities, ROUTE_ENTITY } from '../../test/init-entities'
import { app } from '@/infra/http/app'
import request from 'supertest'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import PrismaEntryTypesRepository from '../../repositories/prisma/PrismaEntryTypesRepository'
import { stringifier } from '@/core/stringifier'

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository

describe('List entry types (E2E)', async () => {
  const {
    farm,
    manyEntryTypes,
    userWithJwt: { user, jwt },
  } = initEntities()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    farmsRepository = new PrismaFarmsRepository()
    entryTypesRepository = new PrismaEntryTypesRepository()

    await usersRepository.create(user)
    await farmsRepository.createOrUpdate(farm)
    await farmsRepository.addMember(user.id, farm.id, Roles.OWNER)

    const promises = manyEntryTypes.map((item) =>
      entryTypesRepository.createOrUpdate(item),
    )
    await Promise.all(promises)
  })

  test('should list type', async () => {
    const response = await request(app)
      .get(ROUTE_ENTITY)
      .auth(jwt.token, { type: 'bearer' })

    expect((response.body.dto as Array<unknown>).length).toEqual(
      manyEntryTypes.length,
    )

    await farmsRepository.deleteMany([farm.id])
    await usersRepository.delete(user.id)
  })
})
