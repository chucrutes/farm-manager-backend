import { Entity, type Timestamps } from '@/core/domain/entity'
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
  private constructor(
    props: RegisterProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations,
  ) {
    super(props, id, timeStamps)
    this._farm = relations?.farm
  }

  static create(
    props: RegisterProps,
    id?: string,
    timeStamps?: Timestamps,
    relations?: Relations,
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

    const minMonth = minDate
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', '')
    const maxMonth = maxDate
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', '')

    let minDay = minDate.getDate()
    let maxDay = maxDate.getDate()

    return `Caixa ${minDay}/${minMonth}/${minYear}-${maxDay}/${maxMonth}/${maxYear}`
  }
}
