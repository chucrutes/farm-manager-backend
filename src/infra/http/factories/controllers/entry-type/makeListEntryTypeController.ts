import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { ListEntryType } from '@/application/entry-type/use-cases/list/list'
import { ListEntryTypeController } from '@/application/entry-type/use-cases/list/list.controller'
import { makeEntryTypeRepository } from '@/infra/db/prisma/factories/make-entry-type-repository'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'

export function makeListEntryTypeController(): Controller {
  const listEntryType = new ListEntryType({
    farmsRepository: makeFarmRepository(),
    entryTypesRepository: makeEntryTypeRepository()
  })

  const validator = new ValidatorCompositor([])

  return new ListEntryTypeController(validator, listEntryType)
}
