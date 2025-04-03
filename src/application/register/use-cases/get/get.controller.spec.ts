import request from 'supertest'
import { app } from '@/infra/http/app'
import type { ToResponseBody } from '@/core/domain/entity'
import { Roles } from '@/application/farms/domain/farm.schema'
import type { RegisterProps } from '../../domain/register.schema'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { initEntities, ROUTE_ENTITY } from '../../test/init-entities'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'
import { makeUserRepository } from '@/infra/db/prisma/factories/make-user-repository'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { makeEntryRepository } from '@/infra/db/prisma/factories/make-entry-repository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import type { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { makeRegisterRepository } from '@/infra/db/prisma/factories/make-register-repository'
import type { IEntriesRepository } from '@/application/entries/repositories/IEntriesRepository'
import { makeEntryTypeRepository } from '@/infra/db/prisma/factories/make-entry-type-repository'
import type { IEntryTypesRepository } from '@/application/entry-type/repositories/IEntryTypesRepository'

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository
let entryRepository: IEntriesRepository
let registerRepository: IRegistersRepository

describe('Get entry type(E2E)', async () => {
  const {
    farm,
    userWithJwt: { user, jwt },

    entryTypes,
    register
  } = initEntities()

  beforeAll(async () => {
    usersRepository = makeUserRepository()
    farmsRepository = makeFarmRepository()
    entryTypesRepository = makeEntryTypeRepository()
    entryRepository = makeEntryRepository()
    registerRepository = makeRegisterRepository()

    const entryTypesCreationPromises = entryTypes.map((item) =>
      entryTypesRepository.upsert(item)
    )

    // const entriesCreationPromises = entries.map((item) =>
    //   entryRepository.upsert(item)
    // )

    await usersRepository.create(user)
    await farmsRepository.upsert(farm)
    await farmsRepository.addMember(user.id, farm.id, Roles.OWNER)
    await Promise.all(entryTypesCreationPromises)
    // await Promise.all(entriesCreationPromises)
    // await registerRepository.upsert(register)
  })

  test('should get a type', async () => {
    // const response = await request(app)
    //   .get(`${ROUTE_ENTITY}/${register.id}`)
    //   .auth(jwt.token, { type: 'bearer' })
    // expect((response.body.dto as ToResponseBody<RegisterProps>).name).toEqual(
    //   register.props.name
    // )
  })

  afterAll(async () => {
    // await farmsRepository.deleteMany([farm.id])
    // await usersRepository.delete(user.id)
  })
})
