import { beforeAll, describe, expect, test } from 'vitest'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { UserFactory } from '../../../../tests/factories/UserFactory'
import { ChangePassword } from './change-password'
import { Password } from '@/core/domain/password'
import { User } from '../../domain/user'

let usersRepository: IUsersRepository
let changePassword: ChangePassword

describe('Change password', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    changePassword = new ChangePassword(usersRepository)
  })
  test('should be able to change password', async () => {
    const hashed = Password.create('Teste@12345', true).value as Password

    const user = UserFactory.create({
      password: await hashed.getHashedValue(),
    }) as User

    usersRepository.create(user)

    const response = await changePassword.execute({
      userId: user.id,
      currentPassword: 'Teste@12345',
      password: 'Bacon@1234',
      confirmPassword: 'Bacon@1234',
    })

    expect(response.isRight()).toBeTruthy()
  })

  test('should not be able to change password with nonexistent user id', async () => {
    const response = await changePassword.execute({
      userId: 'invalid-id',
      currentPassword: 'Teste@12345',
      password: 'Bacon@1234',
      confirmPassword: 'Bacon@1234',
    })

    expect(response.isLeft()).toBeTruthy()
  })
})
