import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeRefreshTokenController } from '../factories/controllers/user/makeRefreshTokenController'
import { makeResetPasswordController } from '../factories/controllers/user/makeResetPasswordController'
import { makeChangePasswordController } from '../factories/controllers/user/makeChangePasswordController'

export const user = Router()

user.post(
  '/reset-password',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeResetPasswordController())
)
user.post(
  '/change-password',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeChangePasswordController())
)
user.get(
  '/refresh-token',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeRefreshTokenController())
)
