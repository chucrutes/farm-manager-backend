import type { Controller } from '@/core/infra/controller'
import {
  type HttpResponse,
  clientError,
  ok,
  created,
} from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'

import type {
  CreateOrUpdateEntry,
  CreateOrUpdateEntryRequest,
} from './create-or-update'
import { LANG_ENTITY } from '../../domain/entry'

export type CreateOrUpdateEntryControllerRequest = Omit<
  CreateOrUpdateEntryRequest,
  'userId'
> & {
  requesterId: string
}

export class CreateOrUpdateEntryController implements Controller {
  constructor(
    private readonly validator: Validator<CreateOrUpdateEntryControllerRequest>,
    private createEntry: CreateOrUpdateEntry,
  ) {}

  async handle(
    request: CreateOrUpdateEntryControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntry.execute({
      userId: request.requesterId,
      ...request,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    const entry = result.value
    const dto = {
      type: entry.type?.toResponseBody(),
      farm: entry.farm?.toResponseBody(),
      ...result.value.toResponseBody(),
    }

    if (request._id) {
      return ok({
        key: `${LANG_ENTITY}.created`,
        message: 'Item atualizado com sucesso',
        dto,
      })
    }
    return created({
      key: `${LANG_ENTITY}.created`,
      message: 'Item criado com sucesso',
      dto,
    })
  }
}
