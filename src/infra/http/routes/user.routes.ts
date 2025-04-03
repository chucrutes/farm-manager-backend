import { Router } from 'express'
import { makeRefreshTokenController } from '../factories/controllers/user/makeRefreshTokenController'
import { makeResetPasswordController } from '../factories/controllers/user/makeResetPasswordController'
import { makeChangePasswordController } from '../factories/controllers/user/makeChangePasswordController'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'

export const user = Router()

user.post(
  '/reset-password',

  adaptRoute(makeResetPasswordController())
)
user.post(
  '/change-password',

  adaptRoute(makeChangePasswordController())
)
user.get(
  '/refresh-token',

  adaptRoute(makeRefreshTokenController())
)
