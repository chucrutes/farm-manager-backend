import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'

export const makeEntryTypeRepository = () => {
  return new PrismaEntryTypesRepository()
}
