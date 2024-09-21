import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeListEntryController } from '../factories/controllers/entry/makeListEntryController'
import { makeCreateOrUpdateEntryController } from '../factories/controllers/entry/makeCreateOrUpdateEntryController'

export const entry = Router()

entry.post(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeCreateOrUpdateEntryController())
)
entry.get(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeListEntryController())
)
