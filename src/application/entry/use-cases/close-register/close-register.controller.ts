import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CloseRegister, CloseRegisterRequest } from './close-register'

type CloseRegisterControllerRequest = Omit<CloseRegisterRequest, 'userId'> & {
  currentUserId: string
}

export class CloseRegisterController implements Controller {
  constructor(
    private readonly validator: Validator<CloseRegisterControllerRequest>,
    private createEntry: CloseRegister,
  ) {}

  async handle(request: CloseRegisterControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntry.execute({
      userId: request.currentUserId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return created({ message: t('entry.deleted') })
  }
}
