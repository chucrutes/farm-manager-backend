import { Either, left, right } from '@/core/logic/either'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { User } from '../../domain/user'

type ResetPasswordRequest = {
  userId: string
  password: string
  confirmPassword: string
}

type ResetPassWordResponse = Either<UserDoesNotExistError, null>

export class ResetPassword {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
    password
  }: ResetPasswordRequest): Promise<ResetPassWordResponse> {
    const userExists = await this.usersRepository.findById(userId)

    if (!userExists) {
      return left(new UserDoesNotExistError())
    }

    const userOrError = User.create(
      { ...userExists.props, password },
      userExists.id
    )

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    await this.usersRepository.update(user)

    return right(null)
  }
}
