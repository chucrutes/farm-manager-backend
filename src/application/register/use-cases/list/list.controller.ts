import type { ListRegister, ListRegisterRequest } from './list'
import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'

type ListRegisterControllerRequest = Omit<ListRegisterRequest, 'userId'> & {
  requesterId: string
}

export class ListRegisterController implements Controller {
  constructor(
    private readonly validator: Validator<ListRegisterControllerRequest>,
    private listRegister: ListRegister,
  ) {}

  async handle(request: ListRegisterControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.listRegister.execute({
      userId: request.requesterId,
    })

    if (result.isLeft()) {
      return clientError(result.value)
    }

    const { metadata, data } = result.value

    return ok({
      headers: metadata,
      dto: data.map((res) => ({
        ...res.toResponseBody(),
        farm: res.farm?.toResponseBody(),
      })),
    })
  }
}
