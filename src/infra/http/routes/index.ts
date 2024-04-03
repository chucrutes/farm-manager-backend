import { Router } from 'express'
import { auth } from './auth.routes'
import { user } from './user.routes'

export const router = Router()

router.use('/auth', auth)
router.use('/users', user)
