import { Either, left, right } from '@/core/logic/either'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'
import { JWT } from '../../../../core/domain/jwt'
import { compare } from 'bcryptjs'

type TokenResponse = {
  token: string
}

type AuthenticateUserRequest = {
  user: string
  password: string
}

type AuthenticateUserResponse = Either<
  InvalidEmailOrPasswordError,
  TokenResponse
>

export class AuthenticateUser {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    user,
    password
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const userExists = await this.usersRepository.findByEmailOrUsername(user)

    if (!userExists) {
      return left(new InvalidEmailOrPasswordError())
    }

    const isPasswordValid = await compare(password, userExists.props.password)

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError())
    }

    const { token } = JWT.signUser(userExists)

    return right({ token })
  }
}
