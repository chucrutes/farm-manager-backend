import { InvalidJWTTokenError } from '@/core/domain/errors/InvalidJWTTokenError'
import { JWT } from '@/core/domain/jwt'
import { Either, left, right } from '@/core/logic/either'

type RefreshTokenRequest = {
  currentUserId: string
}

type RefreshTokenResponse = Either<null, string>

export class RefreshToken {
  async execute({
    currentUserId
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const refreshToken = JWT.refreshToken(currentUserId)
    return right(refreshToken.token)
  }
}
