import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { PrismaEntriesRepository } from '@/application/entries/repositories/prisma/PrismaEntriesRepository'
import PrismaRegistersRepository from '@/application/register/repositories/prisma/PrismaRegistersRepository'
import { CreateRegister } from '@/application/register/use-cases/create/create'
import { CloseRegisterController } from '@/application/register/use-cases/close-register/close-register.controller'
import { GetFarmByUser } from '@/application/farms/use-cases/get-farm-by-user-id/get-farm-by-user-id'




export function makeCloseRegisterController(): Controller {
  const entriesRepository = new PrismaEntriesRepository()
  const farmsRepository = new PrismaFarmsRepository()
  const registersRepository = new PrismaRegistersRepository()

  const getFarmByUserId = new GetFarmByUser(farmsRepository)
  const createRegister = new CreateRegister({registersRepository, entriesRepository})

  const validator = new ValidatorCompositor([])

  return new CloseRegisterController(validator, getFarmByUserId, createRegister)
}
