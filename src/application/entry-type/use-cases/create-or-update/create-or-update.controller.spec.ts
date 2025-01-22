import { Roles } from '@/application/farms/domain/farm.schema'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import type { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { initEntities, ROUTE_ENTITY } from '../../test/init-entities'
import { app } from '@/infra/http/app'
import request from 'supertest'
import { EntryTypeFactory } from '../../test/entry-types.factory'
import type { CreateOrUpdateEntryTypeControllerRequest } from './create-or-update.controller'
import type { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import PrismaEntryTypesRepository from '../../repositories/prisma/PrismaEntryTypesRepository'
import type { ToResponseBody } from '@/core/domain/entity'
import type { EntryTypeProps } from '../../domain/entry-type.schema'
import { entryType } from '@/infra/http/routes/entry-types.routes'
import { StatusCodes } from 'http-status-codes'

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository

type Request = Omit<CreateOrUpdateEntryTypeControllerRequest, 'requesterId'>

describe('Create or update entry type(E2E)', async () => {
  const {
    farm,
    entryType,
    userWithJwt: { user, jwt },
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

  test('should create a type', async () => {
    const entryType = EntryTypeFactory.create()

    const data: Request = entryType.props

    const response = await request(app)
      .post(ROUTE_ENTITY)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect((response.body.dto as ToResponseBody<EntryTypeProps>).name).toEqual(
      entryType.props.name,
    )
  })

  test('should create a type without commission', async () => {
    const { commission, ...entryType } = EntryTypeFactory.create().props

    const data: Request = entryType

    const response = await request(app)
      .post(ROUTE_ENTITY)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(
      (response.body.dto as ToResponseBody<EntryTypeProps>).commission,
    ).toBeUndefined()
  })

  test('should not create a type with the same name as a existing type', async () => {
    const { commission, ...rest } = EntryTypeFactory.create({
      name: entryType.props.name,
    }).props

    const data: Request = rest

    const response = await request(app)
      .post(ROUTE_ENTITY)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect(response.status).toEqual(StatusCodes.CONFLICT)
  })
  test('should update a type', async () => {
    const { commission, ...rest } = EntryTypeFactory.create({
      name: entryType.props.name,
      id: entryType.id,
    }).props

    const data: Request = { _id: entryType.id, ...rest }

    const response = await request(app)
      .post(ROUTE_ENTITY)
      .auth(jwt.token, { type: 'bearer' })
      .send(data)

    expect((response.body.dto as ToResponseBody<EntryTypeProps>)._id).toEqual(
      entryType.id,
    )
  })

  afterAll(async () => {
    await farmsRepository.deleteMany([farm.id])
    await usersRepository.delete(user.id)
  })
})
