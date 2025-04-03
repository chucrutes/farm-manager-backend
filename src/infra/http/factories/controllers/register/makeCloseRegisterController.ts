import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CreateRegister } from '@/application/register/use-cases/create/create'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { makeEntryRepository } from '@/infra/db/prisma/factories/make-entry-repository'
import { makeRegisterRepository } from '@/infra/db/prisma/factories/make-register-repository'
import { GetFarmByUser } from '@/application/farms/use-cases/get-farm-by-user-id/get-farm-by-user-id'
import { CloseRegisterController } from '@/application/register/use-cases/close-register/close-register.controller'

export function makeCloseRegisterController(): Controller {
  const getFarmByUserId = new GetFarmByUser(makeFarmRepository())
  const createRegister = new CreateRegister({
    registersRepository: makeRegisterRepository(),
    entriesRepository: makeEntryRepository()
  })

  const validator = new ValidatorCompositor([])

  return new CloseRegisterController(validator, getFarmByUserId, createRegister)
}
