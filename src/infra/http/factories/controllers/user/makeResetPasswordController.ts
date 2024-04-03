import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CompareFieldsValidator } from '@/infra/validation/CompareFieldsValidator'
import { ResetPassword } from '@/application/users/use-cases/reset-password/reset-password'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ResetPasswordController } from '@/application/users/use-cases/reset-password/reset-password.controller'

type ComparableFields = {
  password: string
  confirmPassword: string
}

export function makeResetPasswordController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const resetPassword = new ResetPassword(prismaUsersRepository)

  const validator = new ValidatorCompositor<ComparableFields>([
    new CompareFieldsValidator({
      field: 'password',
      fieldToCompare: 'confirmPassword',
      keyMessage: 'account.passwords_dont_match'
    })
  ])

  return new ResetPasswordController(validator, resetPassword)
}
