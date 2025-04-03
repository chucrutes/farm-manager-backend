import { PrismaEntriesRepository } from '@/application/entries/repositories/prisma/PrismaEntriesRepository'

export const makeEntryRepository = () => {
  return new PrismaEntriesRepository()
}
