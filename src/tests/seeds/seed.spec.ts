import { beforeAll, describe, expect, test } from 'vitest'
import { UserFactory } from '@/tests/factories/UserFactory'
import type { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { FarmFactory } from '@/application/farms/test/farm.factory'
import { Roles } from '@/application/farms/domain/farm.schema'

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository

describe('Create seeds (end-to-end)', async () => {
  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
    farmsRepository = new PrismaFarmsRepository()
  })

  test('should be truthy', async () => {
    const [user1, user2] = UserFactory.createMany([
      {
        name: 'Matheus Boeira',
        email: 'matheusboeira.aluno@unipampa.edu.br',
        password: 'teste',
        username: 'matheusboeira',
      },
      {
        name: 'Thiago Melo',
        email: 'tmelo387@gmail.com',
        password: 'teste',
        username: 'chucrutes',
      },
    ])
    await usersRepository.create(user1)
    await usersRepository.create(user2)

    const [farm1, farm2] = FarmFactory.createMany([
      {
        name: 'farm1',
      },
      {
        name: 'farm2',
      },
    ])

    await farmsRepository.createOrUpdate(farm1)
    await farmsRepository.createOrUpdate(farm2)
    await farmsRepository.addMember(user1.id, farm1.id, Roles.OWNER)
    await farmsRepository.addMember(user2.id, farm2.id, Roles.OWNER)

    expect(true).toBeTruthy()
  })
})
