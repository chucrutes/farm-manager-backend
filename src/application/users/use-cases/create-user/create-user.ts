import { User } from '../../domain/user'
import { type Either, left, right } from '@/core/logic/either'
import { UserAlreadyExistsError } from './errors/UserAlreadyExistsError'
import type { IUsersRepository } from '../../repositories/IUsersRepository'
import type { CreateOrUpdateFarm } from '@/application/farms/use-cases/create-or-update/create-or-update'

type CreateUserRequest = {
  email: string
  name: string
  username?: string
  password: string
  phone?: string
}

type CreateUserResponse = Either<UserAlreadyExistsError, User>

export class CreateUser {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly upsertFarm: CreateOrUpdateFarm
  ) {}

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
    await this.createFarm(user)
    return right(user)
  }

  async createFarm(user: User) {
    await this.upsertFarm.execute({
      name: `fazenda ${user.props.name}`,
      userId: user.id
    })
  }
}
