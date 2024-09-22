import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { ListEntry } from './list-entry'

type ListEntryControllerRequest = {
  currentUserId: string
}

export class ListEntryController implements Controller {
  constructor(
    private readonly validator: Validator<ListEntryControllerRequest>,
    private listEntry: ListEntry
  ) {}

  async handle(request: ListEntryControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.listEntry.execute({
      userId: request.currentUserId
    })

    return ok({
      dto: result.entries.map((res) => ({
        ...res.toResponseBody()
      })),
      total: result.total
    })
  }
}
