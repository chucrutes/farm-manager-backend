import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeCloseRegisterController } from '../factories/controllers/register/makeCloseRegisterController'
import { makeListRegisterController } from '../factories/controllers/register/makeListController'
import { makeGetRegisterController } from '../factories/controllers/register/makeGetController'

export const register = Router()

register.post('/', adaptRoute(makeCloseRegisterController()))
register.get('/', adaptRoute(makeListRegisterController()))
register.get('/:id', adaptRoute(makeGetRegisterController()))
