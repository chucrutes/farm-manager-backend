import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { PrismaEntriesRepository } from '@/application/entries/repositories/prisma/PrismaEntriesRepository'
import { DeleteEntry } from '@/application/entries/use-cases/delete/delete'
import { DeleteEntryController } from '@/application/entries/use-cases/delete/delete.controller'

export function makeDeleteEntryController(): Controller {
  const farmsRepository = new PrismaFarmsRepository()
  const entriesRepository = new PrismaEntriesRepository()

  const deleteEntry = new DeleteEntry({
    farmsRepository,
    entriesRepository,
  })

  const validator = new ValidatorCompositor([])

  return new DeleteEntryController(validator, deleteEntry)
}
