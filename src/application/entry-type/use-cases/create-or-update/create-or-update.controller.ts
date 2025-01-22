import type { Controller } from '@/core/infra/controller'
import {
  type HttpResponse,
  clientError,
  conflict,
  ok,
} from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'

import type {
  CreateOrUpdateEntryType,
  CreateOrUpdateEntryTypeRequest,
} from './create-or-update'
import { LANG_ENTITY } from '../../domain/entry-type'
import { EntryTypeWithTheSameNameError } from '../@errors/EntryTypeWithTheSameNameError'

export type CreateOrUpdateEntryTypeControllerRequest = Omit<
  CreateOrUpdateEntryTypeRequest,
  'userId'
> & {
  requesterId: string
}

export class CreateOrUpdateEntryTypeController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrUpdateEntryTypeControllerRequest>,
    private createEntryType: CreateOrUpdateEntryType,
  ) {}

  async handle(
    request: CreateOrUpdateEntryTypeControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntryType.execute({
      userId: request.requesterId,
      ...request,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EntryTypeWithTheSameNameError:
          return conflict(error)
        default:
          return clientError(error)
      }
    }
    return ok({
      message: `${LANG_ENTITY}.created`,
      dto: result.value.toResponseBody(),
    })
  }
}
