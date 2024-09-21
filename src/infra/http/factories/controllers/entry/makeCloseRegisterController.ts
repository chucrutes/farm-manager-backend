import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CloseRegister } from '@/application/entry/use-cases/close-register/close-register'
import { PrismaEntriesRepository } from '@/application/entry/repositories/prisma/PrismaEntriesRepository'
import { CloseRegisterController } from '@/application/entry/use-cases/close-register/close-register.controller'

export function makeCloseRegisterController(): Controller {
  const prismaEntriesRepository = new PrismaEntriesRepository()
  const closeRegister = new CloseRegister(prismaEntriesRepository)

  const validator = new ValidatorCompositor([])

  return new CloseRegisterController(validator, closeRegister)
}
