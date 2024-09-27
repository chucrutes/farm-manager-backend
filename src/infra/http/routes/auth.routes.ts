// @ts-nocheck
import { Router } from 'express'
import { adaptRoute } from '@/core/infra/adapters/express-route-adapter'
import { makeCreateUserController } from '../factories/controllers/user/makeCreateUserController'
import { makeAuthenticateUserController } from '../factories/controllers/user/makeAuthenticateUserController'

export const auth = Router()

auth.post('/sign-in', adaptRoute(makeAuthenticateUserController()))
auth.post('/sign-up', adaptRoute(makeCreateUserController()))
