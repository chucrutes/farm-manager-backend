import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { ListEntry } from '@/application/entries/use-cases/list-entry/list-entry'
import { ListEntryController } from '@/application/entries/use-cases/list-entry/list-entry.controller'
import { PrismaEntriesRepository } from '@/application/entries/repositories/prisma/PrismaEntriesRepository'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'

export function makeListEntryController(): Controller {
  const entriesRepository = new PrismaEntriesRepository()
  const farmsRepository = new PrismaFarmsRepository()
  const listEntry = new ListEntry({ entriesRepository, farmsRepository })

  const validator = new ValidatorCompositor([])

  return new ListEntryController(validator, listEntry)
}
