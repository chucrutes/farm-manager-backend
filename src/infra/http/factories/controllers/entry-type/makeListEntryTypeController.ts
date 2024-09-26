import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { ListEntryType } from '@/application/entry-type/use-cases/list/list'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { ListEntryTypeController } from '@/application/entry-type/use-cases/list/list.controller'
import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'

export function makeListEntryTypeController(): Controller {
  const entryTypesRepository = new PrismaEntryTypesRepository()
  const farmsRepository = new PrismaFarmsRepository()
  const listEntryType = new ListEntryType({
    entryTypesRepository,
    farmsRepository
  })

  const validator = new ValidatorCompositor([])

  return new ListEntryTypeController(validator, listEntryType)
}
