import type { Controller } from '@/core/infra/controller'
import { GetRegister } from '@/application/register/use-cases/get/get'
import { GetRegisterController } from '@/application/register/use-cases/get/get.controller'
import { makeRegisterRepository } from '@/infra/db/prisma/factories/make-register-repository'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'

export function makeGetRegisterController(): Controller {
  const createRegister = new GetRegister({
    registerRepository: makeRegisterRepository(),
    farmRepository: makeFarmRepository()
  })

  return new GetRegisterController(createRegister)
}
