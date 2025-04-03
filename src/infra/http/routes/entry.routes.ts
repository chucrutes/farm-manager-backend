import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeDeleteEntryController } from '../factories/controllers/entry/makeDeleteController'
import { makeListEntryController } from '../factories/controllers/entry/makeListEntryController'
import { makeCreateOrUpdateEntryController } from '../factories/controllers/entry/makeCreateOrUpdateController'

export const entry = Router()

entry.post(
  '/',

  adaptRoute(makeCreateOrUpdateEntryController())
)
entry.delete(
  '/',

  adaptRoute(makeDeleteEntryController())
)
entry.get(
  '/',

  adaptRoute(makeListEntryController())
)
