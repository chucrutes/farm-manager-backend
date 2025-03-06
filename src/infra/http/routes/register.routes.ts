import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeCloseRegisterController } from '../factories/controllers/register/makeCloseRegisterController'

export const register = Router()

register.post(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeCloseRegisterController())
)
