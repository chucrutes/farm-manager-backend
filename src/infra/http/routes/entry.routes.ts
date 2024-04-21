import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeCreateEntryController } from '../factories/controllers/entry/makeCreateEntryController'
import { makeListEntryController } from '../factories/controllers/entry/makeListEntryController'

export const entry = Router()

entry.post(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeCreateEntryController()),
)
entry.get(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeListEntryController()),
)
