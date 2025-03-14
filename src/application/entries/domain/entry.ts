import type { Farm } from '@/application/farms/domain/farm'
import { type EntryProps, EntrySchema } from './entry.schema'
import { Entity, type Timestamps } from '@/core/domain/entity'
import { type Either, left, right } from '@/core/logic/either'
import type { Register } from '@/application/register/domain/register'
import type { EntryType } from '@/application/entry-type/domain/entry-type'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import {
  calculatePercentage,
  calculateTotalAfterCommission,
} from '@/utils/number.utils'
import { stringifier } from '@/utils/stringifier'

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

  private constructor(
    props: EntryProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations,
  ) {
    super(props, id, timeStamps)
    this._farm = relations?.farm
    this._type = relations?.type
    this._register = relations?.register
  }

  static create(
    props: EntryProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations,
  ): Either<Error, Entry> {
    const result = EntrySchema.safeParse(props)
    stringifier(relations)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Entry(result.data, id, timeStamps, relations))
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

  get getTotal() {
    return this.props.price * this.props.quantity
  }

  get getAfterTax(): number {
    const total = this.getTotal

    if (!this._type?.props.commission) {
      return total
    }

    const commission = this.props.commission ?? 0
    const percentage = calculatePercentage(commission)

    return calculateTotalAfterCommission(total, percentage)
  }

  setTotal(value: number) {
    this.props.total = value
  }

  setAfterTax(value: number) {
    this.props.afterTax = value
  }
}
