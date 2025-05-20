import type { Controller } from '@/core/infra/controller'
import {
  type HttpResponse,
  clientError,
  conflict,
  ok,
} from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'

import type { DeleteEntry, DeleteEntryRequest } from './delete'
import { LANG_ENTITY } from '../../domain/entry'

export type DeleteEntryControllerRequest = Omit<
  DeleteEntryRequest,
  'userId'
> & {
  requesterId: string
}

export class DeleteEntryController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteEntryControllerRequest>,
    private createEntry: DeleteEntry,
  ) {}

  async handle(request: DeleteEntryControllerRequest): Promise<HttpResponse> {
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
        case Error:
          return conflict(error)
        default:
          return clientError(error)
      }
    }

    return ok({
      key: `${LANG_ENTITY}.deleted`,
      message: 'Itens excluídos com sucesso',
    })
  }
}
