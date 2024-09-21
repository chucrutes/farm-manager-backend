import { Entity } from '@/core/domain/entity'
import { Farm } from '@/application/farms/domain/farm'
import { EntryProps, EntrySchema } from './entry.schema'
import { Either, left, right } from '@/core/logic/either'
import { EntryType } from '@/application/entry-type/domain/entry-type'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'

export const LANG_ENTITY = 'entry'

export type Relations = {
  farm?: Farm
  type?: EntryType
}

export class Entry extends Entity<EntryProps> {
  private _farm?: Farm
  private _type?: EntryType

  private constructor(props: EntryProps, id?: string, relations?: Relations) {
    super(props, id)
    this._farm = relations?.farm
    this._type = relations?.type
  }

  static create(
    props: EntryProps,
    id?: string,
    relations?: Relations
  ): Either<Error, Entry> {
    const result = EntrySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Entry(result.data, id, relations))
  }

  get farm() {
    return this._farm
  }
  get type() {
    return this._type
  }
}
