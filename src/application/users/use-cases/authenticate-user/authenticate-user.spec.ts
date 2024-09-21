import { AuthenticateUser } from './authenticate-user'
import { beforeEach, describe, expect, test } from 'vitest'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UserFactory } from '../../../../tests/factories/UserFactory'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'

let usersRepository: IUsersRepository
let authenticateUser: AuthenticateUser

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUser = new AuthenticateUser(usersRepository)
  })

  test('should not be able to authenticate with invalid e-mail', async () => {
    const response = await authenticateUser.execute({
      user: 'invalid@example.com',
      password: '123456'
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new InvalidEmailOrPasswordError())
  })

  test('should not be able to authenticate with invalid password', async () => {
    const user = UserFactory.create({
      email: 'john@doe.com',
      password: '12345678'
    })

    usersRepository.create(user)

    const response = await authenticateUser.execute({
      user: 'john@doe.com',
      password: 'invalid-password'
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new InvalidEmailOrPasswordError())
  })
})
