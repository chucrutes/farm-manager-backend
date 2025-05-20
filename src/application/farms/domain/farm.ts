import { Entity } from '@/core/domain/entity'
import { type FarmProps, FarmSchema } from './farm.schema'
import { type Either, left, right } from '@/core/logic/either'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'

export const LANG_ENTITY = 'farm'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Relations = {}

export class Farm extends Entity<FarmProps> {
  private constructor(props: FarmProps, id?: string) {
    super(props, id)
  }

  static create(props: FarmProps, id?: string): Either<Error, Farm> {
    const result = FarmSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Farm(result.data, id))
  }
}
