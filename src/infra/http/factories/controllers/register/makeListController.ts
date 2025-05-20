import type { Controller } from '@/core/infra/controller'
import { ListRegister } from '@/application/register/use-cases/list/list'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { ListRegisterController } from '@/application/register/use-cases/list/list.controller'
import { makeRegisterRepository } from '@/infra/db/prisma/factories/make-register-repository'

export function makeListRegisterController(): Controller {
  const listRegister = new ListRegister({
    registersRepository: makeRegisterRepository(),
    farmsRepository: makeFarmRepository()
  })

  const validator = new ValidatorCompositor([])

  return new ListRegisterController(validator, listRegister)
}
