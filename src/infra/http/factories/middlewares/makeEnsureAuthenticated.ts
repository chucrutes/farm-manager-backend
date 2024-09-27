import type { Middleware } from '@/core/infra/middleware'
import { EnsureAuthenticatedMiddleware } from '@/infra/http/middlewares/ensure-authenticated'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

export function makeEnsureAuthenticated(): Middleware {
  const usersRepository = new PrismaUsersRepository()
  const ensureAuthenticatedMiddleware = new EnsureAuthenticatedMiddleware(
    usersRepository
  )

  return ensureAuthenticatedMiddleware
}
