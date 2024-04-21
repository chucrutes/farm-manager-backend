import { Either, left, right } from '@/core/logic/either'
import { User } from '../../domain/user'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'

type CreateUserRequest = {
  email: string
  name: string
  username?: string
  password: string
  phone?: string
}

type CreateUserResponse = Either<UserAlreadyExistsError, User>

export class CreateUser {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute({
    email,
    username,
    ...request
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (username) {
      const usernameAlreadyTaken =
        await this.usersRepository.existsByUsername(username)

      if (usernameAlreadyTaken) {
        return left(new UserAlreadyExistsError())
      }
    }

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    const userOrError = User.create({
      ...request,
      emailVerified: false,
      email,
      username
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    await this.usersRepository.create(user)

    return right(user)
  }
}
