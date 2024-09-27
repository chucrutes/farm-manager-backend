import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'

import { ChangePassword } from './change-password'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { CurrentPaswordDoesNotMatchError } from './errors/CurrentPasswordDoesNotMatchError'

type ChangePasswordControllerRequest = {
  currentUserId: string
  currentPassword: string
  password: string
  confirmPassword: string
}

export class ChangePasswordController implements Controller {
  constructor(
    private readonly validator: Validator<ChangePasswordControllerRequest>,
    private changePassword: ChangePassword,
  ) {}
  async handle(
    {currentUserId, ...request}: ChangePasswordControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate({currentUserId, ...request})

    if (validated.isLeft()) {
      return clientError(validated.value)
    }
    const result = await this.changePassword.execute({userId: currentUserId, ...request})

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CurrentPaswordDoesNotMatchError:
          case UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: ('user.password_changed') })
  }
}
