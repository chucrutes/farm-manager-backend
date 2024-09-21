import { Entity } from '@/core/domain/entity'
import { Farm } from '@/application/farms/domain/farm'
import { Either, left, right } from '@/core/logic/either'
import { EntryTypeProps, EntryTypeSchema } from './entry-type.schema'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'

export const LANG_ENTITY = 'entry_type'

export type Relations = {
  farm?: Farm
}

export class EntryType extends Entity<EntryTypeProps> {
  private _farm?: Farm

  private constructor(
    props: EntryTypeProps,
    id?: string,
    relations?: Relations
  ) {
    super(props, id)
    this._farm = relations?.farm
  }

  static create(
    props: EntryTypeProps,
    id?: string,
    relations?: Relations
  ): Either<Error, EntryType> {
    const result = EntryTypeSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new EntryType(result.data, id, relations))
  }

  get farm() {
    return this._farm
  }
}
