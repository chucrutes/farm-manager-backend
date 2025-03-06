import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { DeleteEntryType } from '@/application/entry-type/use-cases/delete/delete'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { DeleteEntryTypeController } from '@/application/entry-type/use-cases/delete/delete.controller'
import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'

export function makeDeleteEntryTypeController(): Controller {
  const farmsRepository = new PrismaFarmsRepository()
  const entryTypesRepository = new PrismaEntryTypesRepository()

  const deleteEntryType = new DeleteEntryType({
    farmsRepository,
    entryTypesRepository,
  })

  const validator = new ValidatorCompositor([])

  return new DeleteEntryTypeController(validator, deleteEntryType)
}
