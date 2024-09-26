import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { CreateOrUpdateEntryType } from '@/application/entry-type/use-cases/create-or-update/create-or-update'
import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'
import { CreateOrUpdateEntryTypeController } from '@/application/entry-type/use-cases/create-or-update/create-or-update.controller'

export function makeCreateOrUpdateEntryTypeController(): Controller {
  const farmsRepository = new PrismaFarmsRepository()
  const entryTypesRepository = new PrismaEntryTypesRepository()

  const createEntryType = new CreateOrUpdateEntryType({
    farmsRepository,
    entryTypesRepository
  })

  const validator = new ValidatorCompositor([])

  return new CreateOrUpdateEntryTypeController(validator, createEntryType)
}
