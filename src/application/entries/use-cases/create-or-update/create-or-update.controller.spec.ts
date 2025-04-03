import { Roles } from '@/application/farms/domain/farm.schema'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import type { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { initEntities, ROUTE_ENTITY } from '../../test/init-entities'
import { app } from '@/infra/http/app'
import request from 'supertest'
import { EntryFactory } from '../../test/entry.factory'
import type { CreateOrUpdateEntryControllerRequest } from './create-or-update.controller'
import type { ToResponseBody } from '@/core/domain/entity'
import type { EntryProps } from '../../domain/entry.schema'
import type { IEntryTypesRepository } from '@/application/entry-type/repositories/IEntryTypesRepository'
import {
  globalEntryTypesRepository,
  globalFarmsRepository,
  globalUsersRepository
} from '@/tests/vitest.setup'

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository

type Request = Omit<CreateOrUpdateEntryControllerRequest, 'requesterId'>

describe('Create or update entry(E2E)', async () => {
  const {
    farm,
    type,

    userWithJwt: { user, jwt }
  } = initEntities()

  beforeAll(async () => {
    usersRepository = globalUsersRepository
    farmsRepository = globalFarmsRepository
    entryTypesRepository = globalEntryTypesRepository

    await usersRepository.create(user)
    await farmsRepository.upsert(farm)
    await farmsRepository.addMember(user.id, farm.id, Roles.OWNER)
    await entryTypesRepository.upsert(type)
  })

  test('should create an entry', async () => {
    const entry = EntryFactory.create()

    const data: Request = { type: { _id: type.id }, ...entry.props }

    const response = await request(app)
      .post(ROUTE_ENTITY)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(
      (response.body.dto as ToResponseBody<EntryProps>).description
    ).toEqual(entry.props.description)
  })

  afterAll(async () => {
    await farmsRepository.deleteMany([farm.id])
    await usersRepository.delete(user.id)
  })
})
