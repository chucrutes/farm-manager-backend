import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'
import type { Validator } from '@/core/infra/validator'
import { LANG_ENTITY } from '../../domain/register'
import type { GetFarmByUser } from '@/application/farms/use-cases/get-farm-by-user-id/get-farm-by-user-id'
import type { RestoreRegister, RestoreRegisterRequest } from './restore'

export type RestoreRegisterControllerRequest = RestoreRegisterRequest & {
  requesterId: string
}

export class RestoreRegisterController implements Controller {
  constructor(
    private readonly validator: Validator<RestoreRegisterControllerRequest>,
    private getFarmByUser: GetFarmByUser,
    private restoreRegister: RestoreRegister,
  ) {}

  async handle({
    registerId,
    requesterId,
  }: RestoreRegisterControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate({ registerId, requesterId })

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const farm = await this.getFarmByUser.execute({
      userId: requesterId,
    })

    if (farm.isLeft()) {
      return clientError(farm.value)
    }

    const result = await this.restoreRegister.execute({
      registerId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }

    return ok({
      message: `${LANG_ENTITY}.restored`,
    })
  }
}
