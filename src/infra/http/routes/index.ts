import { Router } from 'express'
import { auth } from './auth.routes'
import { user } from './user.routes'
import { entry } from './entry.routes'
import { entryType } from './entry-types.routes'
import { register } from './register.routes'
import { adaptMiddleware } from '@/core/infra/adapters/express-middleware-adapter'
import { makeEnsureAuthenticated } from '../factories/middlewares/makeEnsureAuthenticated'

export const router = Router()

router.use('/auth', auth)
router.use(adaptMiddleware(makeEnsureAuthenticated()))
router.use('/users', user)
router.use('/entries', entry)
router.use('/entry-types', entryType)
router.use('/registers', register)
