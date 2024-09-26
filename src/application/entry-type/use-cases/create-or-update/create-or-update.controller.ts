import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import {
  CreateOrUpdateEntryType,
  CreateOrUpdateEntryTypeRequest
} from './create-or-update'
import { LANG_ENTITY } from '../../domain/entry-type'

type CreateOrUpdateEntryTypeControllerRequest = Omit<
  CreateOrUpdateEntryTypeRequest,
  'userId'
> & {
  requesterId: string
}

export class CreateOrUpdateEntryTypeController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrUpdateEntryTypeControllerRequest>,
    private createEntryType: CreateOrUpdateEntryType
  ) {}

  async handle(
    request: CreateOrUpdateEntryTypeControllerRequest
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntryType.execute({
      userId: request.requesterId,
      ...request
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return ok({ message: t(`${LANG_ENTITY}.created`) })
  }
}
