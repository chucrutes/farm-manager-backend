import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { ListEntry } from '@/application/entries/use-cases/list-entry/list-entry'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { makeEntryRepository } from '@/infra/db/prisma/factories/make-entry-repository'
import { ListEntryController } from '@/application/entries/use-cases/list-entry/list-entry.controller'

export function makeListEntryController(): Controller {
  const listEntry = new ListEntry({
    entriesRepository: makeEntryRepository(),
    farmsRepository: makeFarmRepository()
  })

  const validator = new ValidatorCompositor([])

  return new ListEntryController(validator, listEntry)
}
