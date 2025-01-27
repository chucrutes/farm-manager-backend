import type { ListEntry } from './list-entry'
import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'

type ListEntryControllerRequest = {
  requesterId: string
}

export class ListEntryController implements Controller {
  constructor(
    private readonly validator: Validator<ListEntryControllerRequest>,
    private listEntry: ListEntry,
  ) {}

  async handle(request: ListEntryControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.listEntry.execute({
      userId: request.requesterId,
    })

    return ok({
      dto: {
        total: result.total,
        entries: result.entries.map((item) => ({
          ...item.toResponseBody(),
          type: item.type?.toResponseBody(),
          farm: item.farm?.toResponseBody(),
        })),
      },
    })
  }
}
