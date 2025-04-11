import type { Farm } from '@/application/farms/domain/farm'
import { type EntryProps, EntrySchema } from './entry.schema'
import {
  Entity,
  type ToResponseBody,
  type Timestamps
} from '@/core/domain/entity'
import { type Either, left, right } from '@/core/logic/either'
import type { Register } from '@/application/register/domain/register'
import type { EntryType } from '@/application/entry-type/domain/entry-type'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Categories } from '@/application/entry-type/domain/entry-type.schema'

export const LANG_ENTITY = 'entry'

export type Relations = {
  farm?: Farm
  type?: EntryType
  register?: Register | null
}

export class Entry extends Entity<EntryProps> {
  public readonly relations: Relations = {}
  private constructor(
    props: EntryProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations
  ) {
    super(props, id, timeStamps)
    this.relations = relations ? relations : this.relations
  }

  static create(
    props: EntryProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations
  ): Either<Error, Entry> {
    const result = EntrySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    const entity = new Entry(result.data, id, timeStamps, relations)
    entity.calculateTotal()
    entity.calculateAfterTax()

    return right(entity)
  }

  get farm() {
    return this.relations?.farm
  }
  get type() {
    return this.relations?.type
  }
  get register() {
    return this.relations?.register
  }

  get total() {
    const total = this.props.total
    if (typeof total !== 'number') {
      throw new Error('should not throw error')
    }

    return total
  }

  get afterTax() {
    const afterTax = this.props.afterTax
    if (!afterTax) {
      throw new Error('')
    }

    return afterTax
  }

  private calculateTotal() {
    const total = this.props.price * this.props.quantity
    this.props.total = total
  }

  private calculateAfterTax() {
    const total = this.total
    const type = this.relations?.type

    if (!type?.props.commission) {
      this.props.afterTax = total
      this.props.commission = 0
      return
    }

    const commission = this.props.commission ?? 0

    switch (type.props.category) {
      case Categories.EXPENSE:
        this.props.afterTax = total + commission
        break
      case Categories.INCOME:
        this.props.afterTax = total - commission
        break
      default:
    }
  }

  public toResponseBody(): ToResponseBody<EntryProps> {
    const relations = this.composeRelations(this.relations)

    return {
      _id: this._id,
      ...this.props,
      ...this.timestamps,
      ...relations
    }
  }
}
