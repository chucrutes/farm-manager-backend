import { Roles } from '@/application/farms/domain/farm.schema'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import type { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { initEntities, ROUTE_ENTITY } from '../../test/init-entities'
import { app } from '@/infra/http/app'
import request from 'supertest'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import PrismaEntryTypesRepository from '../../repositories/prisma/PrismaEntryTypesRepository'
import type { ToResponseBody } from '@/core/domain/entity'
import type { EntryTypeProps } from '../../domain/entry-type.schema'

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository

describe('Get entry type(E2E)', async () => {
  const {
    farm,
    userWithJwt: { user, jwt },
    entryType,
  } = initEntities()

  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    farmsRepository = new PrismaFarmsRepository()
    entryTypesRepository = new PrismaEntryTypesRepository()

    await usersRepository.create(user)
    await farmsRepository.createOrUpdate(farm)
    await farmsRepository.addMember(user.id, farm.id, Roles.OWNER)
    await entryTypesRepository.createOrUpdate(entryType)
  })

  test('should get a type', async () => {
    const response = await request(app)
      .get(`${ROUTE_ENTITY}/${entryType.id}`)
      .auth(jwt.token, { type: 'bearer' })

    expect((response.body.dto as ToResponseBody<EntryTypeProps>).name).toEqual(
      entryType.props.name,
    )
  })

  afterAll(async () => {
    await farmsRepository.deleteMany([farm.id])
    await usersRepository.delete(user.id)
  })
})
