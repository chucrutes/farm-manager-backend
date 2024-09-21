// import { Controller } from '@/core/infra/controller'
// import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
// import { PrismaEntriesRepository } from '@/application/entry/repositories/prisma/PrismaEntriesRepository'
// import { DeleteEntry } from '@/application/entry/use-cases/delete-entry/delete-entry'
// import { DeleteEntryController } from '@/application/entry/use-cases/delete-entry/delete-entry.controller'

// export function makeDeleteEntryController(): Controller {
//   const prismaEntriesRepository = new PrismaEntriesRepository()
//   const listEntry = new DeleteEntry(prismaEntriesRepository)

//   const validator = new ValidatorCompositor([])

//   return new DeleteEntryController(validator, listEntry)
// }
