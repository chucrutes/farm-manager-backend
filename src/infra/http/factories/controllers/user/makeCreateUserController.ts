import type { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CompareFieldsValidator } from '@/infra/validation/CompareFieldsValidator'
import { CreateUser } from '@/application/users/use-cases/create-user/create-user'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { CreateUserController } from '@/application/users/use-cases/create-user/create-user.controller'
import { makeFarmRepository } from '@/infra/db/prisma/factories/make-farm-repository'
import { CreateOrUpdateFarm } from '@/application/farms/use-cases/create-or-update/create-or-update'

type ComparableFields = {
  password: string
  confirmPassword: string
}

export function makeCreateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const farmsRepository = makeFarmRepository()
  const upsertFarm = new CreateOrUpdateFarm(farmsRepository)
  const createUser = new CreateUser(prismaUsersRepository, upsertFarm)

  const validator = new ValidatorCompositor<ComparableFields>([
    new CompareFieldsValidator({
      field: 'password',
      fieldToCompare: 'confirmPassword',
      keyMessage: 'account.passwords_dont_match'
    })
  ])

  return new CreateUserController(validator, createUser)
}
