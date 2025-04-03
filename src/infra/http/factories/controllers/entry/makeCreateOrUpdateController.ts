import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CreateOrUpdateEntry } from '@/application/entries/use-cases/create-or-update/create-or-update'
import { CreateOrUpdateEntryController } from '@/application/entries/use-cases/create-or-update/create-or-update.controller'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { makeEntryRepository } from '@/infra/db/prisma/factories/make-entry-repository'
import { makeEntryTypeRepository } from '@/infra/db/prisma/factories/make-entry-type-repository'

export function makeCreateOrUpdateEntryController(): Controller {
  const createEntry = new CreateOrUpdateEntry({
    farmsRepository: makeFarmRepository(),
    entriesRepository: makeEntryRepository(),
    entryTypesRepository: makeEntryTypeRepository()
  })

  const validator = new ValidatorCompositor([])

  return new CreateOrUpdateEntryController(validator, createEntry)
}
