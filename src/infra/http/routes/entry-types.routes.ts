import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeGetEntryTypeController } from '../factories/controllers/entry-type/makeGetController'
import { makeListEntryTypeController } from '../factories/controllers/entry-type/makeListEntryTypeController'
import { makeCreateOrUpdateEntryTypeController } from '../factories/controllers/entry-type/makeCreateOrUpdateEntryTypeController'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'

export const entryType = Router()

entryType.post(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeCreateOrUpdateEntryTypeController())
)
entryType.get(
  '/',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeListEntryTypeController())
)
entryType.get(
  '/:id',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeGetEntryTypeController())
)
