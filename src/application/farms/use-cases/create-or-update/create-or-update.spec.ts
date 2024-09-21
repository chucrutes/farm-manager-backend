import {
  CreateOrUpdateFarm,
  CreateOrUpdateFarmRequest
} from './create-or-update'
import { beforeEach, describe, expect, test } from 'vitest'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IFarmsRepository } from '../../repositories/IFarmsRepository'
import { InMemoryFarmsRepository } from '../../repositories/in-memory/InMemoryFarmsRepository'

let farmsRepository: IFarmsRepository
let createOrUpdateFarm: CreateOrUpdateFarm

type Request = CreateOrUpdateFarmRequest

describe('Create an farm', () => {
  const user = UserFactory.create()
  beforeEach(() => {
    farmsRepository = new InMemoryFarmsRepository()
    createOrUpdateFarm = new CreateOrUpdateFarm(farmsRepository)
  })

  test('should create an farm', async () => {
    const data: Request = {
      name: 'test',
      userId: user.id
    }

    const response = await createOrUpdateFarm.execute(data)
    expect(response.isRight()).toBeTruthy()
  })

  test('should not be able to create an farm with invalid data', async () => {
    const data: Request = {
      name: '',
      userId: user.id
    }

    const response = await createOrUpdateFarm.execute(data)
    expect(response.isLeft()).toBeTruthy()
  })
})
