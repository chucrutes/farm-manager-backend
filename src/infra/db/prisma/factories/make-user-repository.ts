import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'

export const makeUserRepository = () => {
  return new PrismaUsersRepository()
}
