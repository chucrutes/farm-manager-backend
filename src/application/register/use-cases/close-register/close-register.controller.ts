import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'
import { LANG_ENTITY } from '../../domain/register'
import type { GetFarmByUser } from '@/application/farms/use-cases/get-farm-by-user-id/get-farm-by-user-id'
import type { CreateRegister } from '../create/create'

export type CloseRegisterControllerRequest = {
  requesterId: string
}

export class CloseRegisterController implements Controller {
  constructor(
    private readonly validator: Validator<CloseRegisterControllerRequest>,
    private getFarmByUser: GetFarmByUser,
    private createRegister: CreateRegister,
  ) {}

  async handle(
    request: CloseRegisterControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const farm = await this.getFarmByUser.execute({
      userId: request.requesterId,
    })

    if (farm.isLeft()) {
      return clientError(farm.value)
    }

    const result = await this.createRegister.execute({
        farm: farm.value
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    const entry = result.value
    return ok({
      message: `${LANG_ENTITY}.created`,
      dto: {
        farm: entry.farm?.toResponseBody(),
        ...result.value.toResponseBody(),
      },
    })
  }
}
