import { type Either, left, right } from '@/core/logic/either'
import { type FarmAttributes, FarmSchema } from './farm.schema'
import { type ConstructorProps, Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'

export const LANG_ENTITY = 'farm'

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type Relations = {}

export class Farm extends Entity<FarmAttributes, Relations> {
  private constructor(props: ConstructorProps<FarmAttributes, Relations>) {
    super(props)
  }

  static create(
    props: ConstructorProps<FarmAttributes, Relations>
  ): Either<Error, Farm> {
    const result = FarmSchema.safeParse(props.attributes)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Farm(props))
  }
}
