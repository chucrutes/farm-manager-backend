import PrismaRegistersRepository from '@/application/register/repositories/prisma/PrismaRegistersRepository'

export const makeRegisterRepository = () => {
  return new PrismaRegistersRepository()
}
