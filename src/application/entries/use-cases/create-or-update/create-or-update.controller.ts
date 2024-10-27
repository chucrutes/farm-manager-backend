import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'

import type {
  CreateOrUpdateEntry,
  CreateOrUpdateEntryRequest
} from './create-or-update'
import { LANG_ENTITY } from '../../domain/entry'

type CreateOrUpdateEntryControllerRequest = Omit<
  CreateOrUpdateEntryRequest,
  'userId'
> & {
  requesterId: string
}

export class CreateOrUpdateEntryController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrUpdateEntryControllerRequest>,
    private createEntry: CreateOrUpdateEntry
  ) {}

  async handle(
    request: CreateOrUpdateEntryControllerRequest
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntry.execute({
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
    return ok({ message: `${LANG_ENTITY}.created` })
  }
}
