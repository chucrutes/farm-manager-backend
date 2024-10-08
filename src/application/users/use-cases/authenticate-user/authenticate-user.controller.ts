import { Controller } from '@/core/infra/controller'
import { Validator } from '@/core/infra/validator'
import { AuthenticateUser } from './authenticate-user'
import {
  HttpResponse,
  clientError,
  ok,
  unauthorized
} from '@/core/infra/http-response'

type AuthenticateUserControllerRequest = {
  user: string
  password: string
}

export class AuthenticateUserController implements Controller {
  constructor(
    private readonly validator: Validator<AuthenticateUserControllerRequest>,
    private authenticateUser: AuthenticateUser
  ) {}

  async handle(
    request: AuthenticateUserControllerRequest
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.authenticateUser.execute(request)

    if (result.isLeft()) {
      const error = result.value
      return unauthorized(error)
    }

    const { token } = result.value
    return ok({ message: 'Logged in succesfully', token })
  }
}
