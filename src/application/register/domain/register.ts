import {
  Entity,
  type ToResponseBody,
  type Timestamps
} from '@/core/domain/entity'
import { type RegisterProps, RegisterSchema } from './register.schema'
import { type Either, left, right } from '@/core/logic/either'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import type { Farm } from '@/application/farms/domain/farm'

export const LANG_ENTITY = 'register'

export type Relations = {
  farm?: Farm
}

export class Register extends Entity<RegisterProps> {
  private _farm?: Farm
  public readonly _relations: Relations = {}
  private constructor(
    props: RegisterProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations
  ) {
    super(props, id, timeStamps)
    this._farm = relations?.farm
    this._relations = relations ? relations : this._relations
  }

  static create(
    props: RegisterProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations
  ): Either<Error, Register> {
    const result = RegisterSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Register(result.data, id, timeStamps, relations))
  }

  get farm() {
    return this._farm
  }

  get name() {
    const name = this.formatDateRange(this.props.startDate, this.props.endDate)
    this.setName(name)
    return name
  }

  private setName(name: string) {
    this.props.name = name
  }

  private formatDateRange(minDate: Date, maxDate: Date) {
    const minYear = minDate.getFullYear()
    const maxYear = maxDate.getFullYear()

    const minMonth = this.returnDate(minDate)
    const maxMonth = this.returnDate(maxDate)

    const minDay = minDate.getDate()
    const maxDay = maxDate.getDate()

    return `Caixa ${minDay}/${minMonth}/${minYear}-${maxDay}/${maxMonth}/${maxYear}`
  }

  returnDate(date: Date) {
    return date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
  }

  public toResponseBody(): ToResponseBody<RegisterProps> {
    const relations = this.composeRelations(this._relations)

    return {
      _id: this._id,
      ...this.props,
      ...relations
    }
  }
}
