import { JWT } from '@/core/domain/jwt'
import { type Either, right } from '@/core/logic/either'

type RefreshTokenRequest = {
  requesterId: string
}

type RefreshTokenResponse = Either<null, string>

export class RefreshToken {
  async execute({
    requesterId,
  }: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const refreshToken = JWT.refreshToken(requesterId)
    return right(refreshToken.token)
  }
}
