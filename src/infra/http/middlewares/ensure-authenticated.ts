import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { AccessDeniedError } from '@/core/domain/errors/AccessDeniedError'
import {
  HttpResponse,
  fail,
  forbidden,
  ok,
  unauthorized
} from '@/core/infra/http-response'
import { Middleware } from '@/core/infra/middleware'
import { decode } from 'jsonwebtoken'
import { UserDoesNotExistsError } from './errors/UserDoesNotExistsError'

type EnsureAuthenticationMiddlewareRequest = {
  intercept: {
    jwt: string
    wid: string
    pid: string
  }
}

type DecodedJwt = {
  sub: string
}

export class EnsureAuthenticatedMiddleware implements Middleware {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async handle(
    request: EnsureAuthenticationMiddlewareRequest
  ): Promise<HttpResponse> {
    try {
      const {
        intercept: { jwt, wid, pid }
      } = request

      if (!jwt) {
        return unauthorized(new AccessDeniedError())
      }

      const [_, token] = jwt.split(' ')

      try {
        const decoded = decode(token) as DecodedJwt
        const isUserValid = await this.usersRepository.findById(decoded.sub)

        if (!isUserValid) {
          return unauthorized(new UserDoesNotExistsError())
        }

        return ok({
          userId: decoded.sub,
          workspaceId: wid,
          projectId: pid
        })
      } catch (err) {
        return forbidden(new AccessDeniedError())
      }
    } catch (error: any) {
      return fail(error)
    }
  }
}
