import PrismaFarmsRepository from '@/application/farms/repositories/prisma/PrismaFarmsRepository'

export const makeFarmRepository = () => {
  return new PrismaFarmsRepository()
}
