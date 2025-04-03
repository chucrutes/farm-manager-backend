import type { GetRegister, GetRegisterRequest } from './get'
import type { Validator } from '@/core/infra/validator'
import type { Controller } from '@/core/infra/controller'
import { type HttpResponse, clientError, ok } from '@/core/infra/http-response'
import type { ControllerIncludes } from '@/core/domain/entity'
import type { Relations } from '../../domain/register'
import { coerceRelations } from '@/@utils/coerce-relations'

type GetRegisterControllerRequest = Omit<
  GetRegisterRequest,
  'userId' | 'includes'
> &
  ControllerIncludes<Relations> & {
    requesterId: string
  }

export class GetRegisterController implements Controller {
  constructor(private getRegister: GetRegister) {}

  async handle({
    requesterId,
    ...request
  }: GetRegisterControllerRequest): Promise<HttpResponse> {
    const result = await this.getRegister.execute({
      userId: requesterId,
      ...request,
      includes: coerceRelations<Relations>(request)
    })

    if (result.isLeft()) {
      return clientError(result.value)
    }

    const data = result.value

    return ok({
      dto: data.toResponseBody()
    })
  }
}
