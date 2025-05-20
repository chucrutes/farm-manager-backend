import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'
import { makeGetEntryTypeController } from '../factories/controllers/entry-type/makeGetController'
import { makeListEntryTypeController } from '../factories/controllers/entry-type/makeListEntryTypeController'
import { makeCreateOrUpdateEntryTypeController } from '../factories/controllers/entry-type/makeCreateOrUpdateEntryTypeController'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeDeleteEntryTypeController } from '../factories/controllers/entry-type/makeDeleteEntryTypeController'

export const entryType = Router()

entryType.post('/', adaptRoute(makeCreateOrUpdateEntryTypeController()))
entryType.delete('/', adaptRoute(makeDeleteEntryTypeController()))
entryType.get('/', adaptRoute(makeListEntryTypeController()))
entryType.get('/:id', adaptRoute(makeGetEntryTypeController()))
