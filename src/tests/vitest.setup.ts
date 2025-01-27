import { PrismaEntriesRepository } from '@/application/entries/repositories/prisma/PrismaEntriesRepository'
import PrismaEntryTypesRepository from '@/application/entry-type/repositories/prisma/PrismaEntryTypesRepository'
import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

export const globalUsersRepository = new PrismaUsersRepository()
export const globalFarmsRepository = new PrismaFarmsRepository()
export const globalEntriesRepository = new PrismaEntriesRepository()
export const globalEntryTypesRepository = new PrismaEntryTypesRepository()
