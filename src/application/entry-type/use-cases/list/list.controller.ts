import type { ListEntryType } from './list'
import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'

type ListEntryTypeControllerRequest = {
  currentUserId: string
}

export class ListEntryTypeController implements Controller {
  constructor(
    private readonly validator: Validator<ListEntryTypeControllerRequest>,
    private listEntryType: ListEntryType
  ) {}

  async handle(request: ListEntryTypeControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.listEntryType.execute({
      userId: request.currentUserId
    })

    return ok({
      dto: result.map((res) => ({
        ...res.toResponseBody()
      }))
    })
  }
}
