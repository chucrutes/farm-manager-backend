import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { makeEntryTypeRepository } from '@/infra/db/prisma/factories/make-entry-type-repository'
import { CreateOrUpdateEntryType } from '@/application/entry-type/use-cases/create-or-update/create-or-update'
import { CreateOrUpdateEntryTypeController } from '@/application/entry-type/use-cases/create-or-update/create-or-update.controller'

export function makeCreateOrUpdateEntryTypeController(): Controller {
  const createEntryType = new CreateOrUpdateEntryType({
    farmsRepository: makeFarmRepository(),
    entryTypesRepository: makeEntryTypeRepository()
  })

  const validator = new ValidatorCompositor([])

  return new CreateOrUpdateEntryTypeController(validator, createEntryType)
}
