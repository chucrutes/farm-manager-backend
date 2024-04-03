import { Controller } from '@/core/infra/controller'
import { RefreshToken } from '@/application/users/use-cases/refresh-token/refresh-token'
import { RefreshTokenController } from '@/application/users/use-cases/refresh-token/refresh-token.controller'

export function makeRefreshTokenController(): Controller {
  const refreshToken = new RefreshToken()
  return new RefreshTokenController(refreshToken)
}
