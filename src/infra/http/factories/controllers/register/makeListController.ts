import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { ListRegister } from '@/application/register/use-cases/list/list'
import { ListRegisterController } from '@/application/register/use-cases/list/list.controller'
import PrismaRegistersRepository from '@/application/register/repositories/prisma/PrismaRegistersRepository'

export function makeListRegisterController(): Controller {
  const registersRepository = new PrismaRegistersRepository()
  const farmsRepository = new PrismaFarmsRepository()
  const listRegister = new ListRegister({
    registersRepository,
    farmsRepository,
  })

  const validator = new ValidatorCompositor([])

  return new ListRegisterController(validator, listRegister)
}
