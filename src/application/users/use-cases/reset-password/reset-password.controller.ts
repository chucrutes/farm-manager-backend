import { ResetPassword } from './reset-password'
import { Validator } from '@/core/infra/validator'
import { Controller } from '@/core/infra/controller'
import { UserDoesNotExistError } from './errors/UserDoesNotExistError'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'

export type ResetPasswordControllerRequest = {
  currentUserId: string
  password: string
  confirmPassword: string
}

export class ResetPasswordController implements Controller {
  constructor(
    private readonly validator: Validator<ResetPasswordControllerRequest>,
    private resetPassword: ResetPassword
  ) {}
  async handle({
    currentUserId,
    ...request
  }: ResetPasswordControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({ currentUserId, ...request })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.resetPassword.execute({
      userId: currentUserId,
      ...request
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserDoesNotExistError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: ('user.password_reset') })
  }
}
