import { Entity } from '@/core/domain/entity'
import type { Farm } from '@/application/farms/domain/farm'
import { type EntryProps, EntrySchema } from './entry.schema'
import { type Either, left, right } from '@/core/logic/either'
import type { EntryType } from '@/application/entry-type/domain/entry-type'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import type { Register } from '@/application/register/domain/register'
import { getPercentage } from '../@utils/get-percentage'

export const LANG_ENTITY = 'entry'

export type Relations = {
  farm?: Farm
  type?: EntryType
  register?: Register | null
}

export class Entry extends Entity<EntryProps> {
  private _farm?: Farm
  private _register?: Register | null
  private _type?: EntryType

  private constructor(props: EntryProps, id?: string, relations?: Relations) {
    super(props, id)
    this._farm = relations?.farm
    this._type = relations?.type
    this._register = relations?.register
  }

  static create(
    props: EntryProps,
    id?: string,
    relations?: Relations,
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
  get register() {
    return this._register
  }

  get afterTax(): null | number {
    if (this._type?.props.commission) {
      return this.props.total * getPercentage(this._type.props.commission)
    }
    return null
  }
}
