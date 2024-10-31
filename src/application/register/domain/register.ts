import { Entity } from '@/core/domain/entity'
import { type RegisterProps, RegisterSchema } from './register.schema'
import { type Either, left, right } from '@/core/logic/either'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'

export const LANG_ENTITY = 'register'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Relations = {}

export class Register extends Entity<RegisterProps> {
  private constructor(props: RegisterProps, id?: string) {
    super(props, id)
  }

  static create(props: RegisterProps, id?: string): Either<Error, Register> {
    const result = RegisterSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Register(result.data, id))
  }
}
