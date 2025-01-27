import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'

import type { ChangePassword } from './change-password'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { CurrentPaswordDoesNotMatchError } from './errors/CurrentPasswordDoesNotMatchError'

type ChangePasswordControllerRequest = {
  requesterId: string
  currentPassword: string
  password: string
  confirmPassword: string
}

export class ChangePasswordController implements Controller {
  constructor(
    private readonly validator: Validator<ChangePasswordControllerRequest>,
    private changePassword: ChangePassword,
  ) {}
  async handle({
    requesterId,
    ...request
  }: ChangePasswordControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({ requesterId, ...request })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }
    const result = await this.changePassword.execute({
      userId: requesterId,
      ...request,
    })

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

    return ok({ message: 'user.password_changed' })
  }
}
