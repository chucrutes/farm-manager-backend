import { beforeAll, describe, expect, test } from 'vitest'
import { UserFactory } from '@/tests/factories/UserFactory'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

let usersRepository: IUsersRepository

describe('Create seeds (end-to-end)', async () => {
  beforeAll(async () => {
    usersRepository = new PrismaUsersRepository()
  })

  test('should be truthy', async () => {
    const [user1, user2, user3] = UserFactory.createMany([
      {
        name: 'Matheus Boeira',
        email: 'matheusboeira.aluno@unipampa.edu.br',
        password: 'teste',
        username: 'matheusboeira'
      },
      {
        name: 'Thiago Melo',
        email: 'tmelo387@gmail.com',
        password: 'Bacon@123',
        username: 'chucrutes'
      },
      {}
    ])
    await usersRepository.create(user1)
    await usersRepository.create(user2)
    await usersRepository.create(user3)

    expect(true).toBeTruthy()
  })
})
