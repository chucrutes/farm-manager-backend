import {
  CreateOrUpdateEntryType,
  CreateOrUpdateEntryTypeRequest
} from './create-or-update'
import { beforeEach, describe, expect, test } from 'vitest'
import { UserFactory } from '@/tests/factories/UserFactory'
import { Categories } from '../../domain/entry-type.schema'
import { IEntryTypesRepository } from '../../repositories/IEntryTypesRepository'
import { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { InMemoryEntryTypesRepository } from '../../repositories/in-memory/InMemoryEntryTypesRepository'
import { InMemoryFarmsRepository } from '@/application/farms/repositories/in-memory/InMemoryFarmsRepository'

let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository
let createOrUpdateEntryType: CreateOrUpdateEntryType

type Request = CreateOrUpdateEntryTypeRequest

describe('Create an farm', () => {
  const user = UserFactory.create()
  beforeEach(() => {
    farmsRepository = new InMemoryFarmsRepository()
    entryTypesRepository = new InMemoryEntryTypesRepository()
    createOrUpdateEntryType = new CreateOrUpdateEntryType({
      entryTypesRepository,
      farmsRepository
    })
  })

  test('should create an farm', async () => {
    const data: Request = {
      name: 'test',
      category: Categories.ASSET,
      userId: user.id
    }

    const response = await createOrUpdateEntryType.execute(data)
    expect(response.isRight()).toBeTruthy()
  })

  test('should not be able to create an farm with invalid data', async () => {
    const data: Request = {
      name: '',
      category: Categories.ASSET,
      userId: user.id
    }

    const response = await createOrUpdateEntryType.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
