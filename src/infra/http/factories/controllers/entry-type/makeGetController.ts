import type { Controller } from '@/core/infra/controller'
import { GetEntryType } from '@/application/entry-type/use-cases/get/get'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { GetEntryTypeController } from '@/application/entry-type/use-cases/get/get.controller'
import { makeEntryTypeRepository } from '@/infra/db/prisma/factories/make-entry-type-repository'

export function makeGetEntryTypeController(): Controller {
  const createEntryType = new GetEntryType({
    entryTypesRepository: makeEntryTypeRepository()
  })

  const validator = new ValidatorCompositor([])

  return new GetEntryTypeController(validator, createEntryType)
}
