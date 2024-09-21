import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { CreateOrUpdateEntry } from '@/application/entries/use-cases/create-or-update/create-or-update'
import { PrismaEntriesRepository } from '@/application/entries/repositories/prisma/PrismaEntriesRepository'
import { CreateOrUpdateEntryController } from '@/application/entries/use-cases/create-or-update/create-or-update.controller'
import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'
export function makeCreateOrUpdateEntryController(): Controller {
  const entriesRepository = new PrismaEntriesRepository()
  const farmsRepository = new PrismaFarmsRepository()
  const entryTypesRepository = new PrismaEntryTypesRepository()

  const createEntry = new CreateOrUpdateEntry({
    farmsRepository,
    entriesRepository,
    entryTypesRepository
  })

  const validator = new ValidatorCompositor([])

  return new CreateOrUpdateEntryController(validator, createEntry)
}
