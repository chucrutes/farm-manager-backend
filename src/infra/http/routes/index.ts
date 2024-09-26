import { Router } from 'express'
import { auth } from './auth.routes'
import { user } from './user.routes'
import { entry } from './entry.routes'
import { entryType } from './entry-types.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/users', user)
router.use('/entries', entry)
router.use('/entry-types', entryType)
