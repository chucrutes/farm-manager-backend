import type { Controller } from '@/core/infra/controller'
import {
  type HttpResponse,
  clientError,
  conflict,
  created,
  ok,
} from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'

import type {
  DeleteEntryType,
  DeleteEntryTypeRequest,
} from './delete'
import { LANG_ENTITY } from '../../domain/entry-type'
import { EntryTypeWithTheSameNameError } from '../@errors/EntryTypeWithTheSameNameError'

export type DeleteEntryTypeControllerRequest = Omit<
  DeleteEntryTypeRequest,
  'userId'
> & {
  requesterId: string
}

export class DeleteEntryTypeController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteEntryTypeControllerRequest>,
    private createEntryType: DeleteEntryType,
  ) {}

  async handle(
    request: DeleteEntryTypeControllerRequest,
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
        key: `${LANG_ENTITY}.deleted`,
        message: 'Itens excluídos com sucesso',
      })
    }
}
