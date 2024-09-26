import { Controller } from '@/core/infra/controller'
import { GetEntryType } from '@/application/entry-type/use-cases/get/get'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { GetEntryTypeController } from '@/application/entry-type/use-cases/get/get.controller'
import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'

export function makeGetEntryTypeController(): Controller {
  const entryTypesRepository = new PrismaEntryTypesRepository()

  const createEntryType = new GetEntryType({
    entryTypesRepository
  })

  const validator = new ValidatorCompositor([])

  return new GetEntryTypeController(validator, createEntryType)
}
