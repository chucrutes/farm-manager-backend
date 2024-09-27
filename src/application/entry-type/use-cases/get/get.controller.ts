
import { Validator } from '@/core/infra/validator'
import { Controller } from '@/core/infra/controller'
import { LANG_ENTITY } from '../../domain/entry-type'
import { GetEntryType, GetEntryTypeRequest } from './get'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'

type GetEntryTypeControllerRequest = Omit<GetEntryTypeRequest, 'userId'> & {
  requesterId: string
}

export class GetEntryTypeController implements Controller {
  constructor(
    private readonly validator: Validator<GetEntryTypeControllerRequest>,
    private createEntryType: GetEntryType
  ) {}

  async handle(request: GetEntryTypeControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntryType.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return ok({ dto: result.value.toResponseBody() })
  }
}
