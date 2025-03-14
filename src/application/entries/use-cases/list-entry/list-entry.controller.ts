import type { ListEntry } from './list-entry'
import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'

type ListEntryControllerRequest = {
  requesterId: string
  type: string
  farm: string
  removeDeletedAt: string
}

export class ListEntryController implements Controller {
  constructor(
    private readonly validator: Validator<ListEntryControllerRequest>,
    private listEntry: ListEntry,
  ) {}

  async handle({
    type,
    farm,
    ...request
  }: ListEntryControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({ type, farm, ...request })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.listEntry.execute({
      userId: request.requesterId,
      includes: {
        type: !!type,
        farm: !!farm,
      },
      removeDeletedAt: !!request.removeDeletedAt,
    })

    if (result.isLeft()) {
      return clientError(result.value)
    }

    const { metadata, data, total } = result.value

    return ok({
      headers: metadata,
      dto: {
        entries: data.map((res) => ({
          ...res.toResponseBody(),
          type: res.type?.toResponseBody(),
          farm: res.farm?.toResponseBody(),
        })),
        total,
      },
    })
  }
}
