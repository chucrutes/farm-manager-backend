import { Entity, Timestamps } from '@/core/domain/entity'
import type { Farm } from '@/application/farms/domain/farm'
import { type Either, left, right } from '@/core/logic/either'
import { type EntryTypeProps, EntryTypeSchema } from './entry-type.schema'
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
    timestamps?: Timestamps,
    relations?: Relations,
  ) {
    super(props, id, timestamps)
    this._farm = relations?.farm
  }

  static create(
    props: EntryTypeProps,
    id?: string,
    timestamps?: Timestamps,
    relations?: Relations,
  ): Either<Error, EntryType> {
    const result = EntryTypeSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new EntryType(result.data, id, timestamps, relations))
  }

  get farm() {
    return this._farm
  }
}
