import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import type { GetEntryType, GetEntryTypeRequest } from './get'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'

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
