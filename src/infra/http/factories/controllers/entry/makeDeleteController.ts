import type { Controller } from '@/core/infra/controller'
import { DeleteEntry } from '@/application/entries/use-cases/delete/delete'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { makeEntryRepository } from '@/infra/db/prisma/factories/make-entry-repository'
import { DeleteEntryController } from '@/application/entries/use-cases/delete/delete.controller'

export function makeDeleteEntryController(): Controller {
  const deleteEntry = new DeleteEntry({
    farmsRepository: makeFarmRepository(),
    entriesRepository: makeEntryRepository()
  })

  const validator = new ValidatorCompositor([])

  return new DeleteEntryController(validator, deleteEntry)
}
