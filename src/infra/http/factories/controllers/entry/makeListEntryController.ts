import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { ListEntry } from '@/application/entry/use-cases/list-entry/list-entry'
import { ListEntryController } from '@/application/entry/use-cases/list-entry/list-entry.controller'
import { PrismaEntriesRepository } from '@/application/entry/repositories/prisma/PrismaEntriesRepository'

export function makeListEntryController(): Controller {
  const prismaEntriesRepository = new PrismaEntriesRepository()
  const listEntry = new ListEntry(prismaEntriesRepository)

  const validator = new ValidatorCompositor([])

  return new ListEntryController(validator, listEntry)
}
