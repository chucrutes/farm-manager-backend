import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeListEntryController } from '../factories/controllers/entry/makeListEntryController'
import { makeCreateEntryController } from '../factories/controllers/entry/makeCreateEntryController'
import { makeCloseRegisterController } from '../factories/controllers/entry/makeCloseRegisterController'

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
// entry.delete(
//   '/:entryId',
//   adaptMiddleware(makeEnsureAuthenticated()),
//   adaptRoute(makeDeleteEntryController()),
// )
entry.put(
  '/close',
  adaptMiddleware(makeEnsureAuthenticated()),
  adaptRoute(makeCloseRegisterController()),
)
