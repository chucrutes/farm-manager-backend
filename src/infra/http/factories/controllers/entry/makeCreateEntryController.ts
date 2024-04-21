import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CreateEntry } from '@/application/entry/use-cases/create-entry/create-entry'
import { PrismaEntriesRepository } from '@/application/entry/repositories/prisma/PrismaEntriesRepository'
import { CreateEntryController } from '@/application/entry/use-cases/create-entry/create-entry.controller'

export function makeCreateEntryController(): Controller {
  const prismaEntriesRepository = new PrismaEntriesRepository()
  const createEntry = new CreateEntry(prismaEntriesRepository)

  const validator = new ValidatorCompositor([])

  return new CreateEntryController(validator, createEntry)
}
