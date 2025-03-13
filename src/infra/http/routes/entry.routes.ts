import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeListEntryController } from '../factories/controllers/entry/makeListEntryController'
import { makeCreateOrUpdateEntryController } from '../factories/controllers/entry/makeCreateOrUpdateController'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeDeleteEntryController } from '../factories/controllers/entry/makeDeleteController'

export const entry = Router()

entry.post(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeCreateOrUpdateEntryController()),
)
entry.delete(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeDeleteEntryController()),
)
entry.get(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeListEntryController()),
)
