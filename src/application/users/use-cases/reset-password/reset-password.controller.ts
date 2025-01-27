import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import * as UserDoesNotExistError from './errors/UserDoesNotExistError'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'
import type { ResetPassword } from './reset-password'

export type ResetPasswordControllerRequest = {
  requesterId: string
  password: string
  confirmPassword: string
}

export class ResetPasswordController implements Controller {
  constructor(
    private readonly validator: Validator<ResetPasswordControllerRequest>,
    private resetPassword: ResetPassword,
  ) {}
  async handle({
    requesterId,
    ...request
  }: ResetPasswordControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({ requesterId, ...request })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.resetPassword.execute({
      userId: requesterId,
      ...request,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotExistError.UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'user.password_reset' })
  }
}
