import { Register } from '../domain/register'
import type { Register as PersistenceRegister } from '@prisma/client'

export class RegisterMapper {
  static toDomain(raw: PersistenceRegister) {
    const registerOrError = Register.create(
      {
        name: raw.name,
        date: raw.date,
        totalExpense: raw.total_expense,
        totalIncome: raw.total_income,
        endDate: raw.end_date,
        startDate: raw.start_date,
      },
      raw.id,
    )

    if (registerOrError.isLeft()) {
      throw new Error('errors.invalid_register')
    }

    return registerOrError.value
  }

  static toPersistence(
    register: Register,
  ): Omit<PersistenceRegister, 'created_at' | 'updated_at' | 'deleted_at'> {
    const { id, props, farm } = register
    const farmId = farm?.id

    if (!farmId) {
      throw new Error('No farm provided')
    }

    return {
      id: id,
      name: register.name,
      total_expense: props.totalExpense,
      total_income: props.totalIncome,
      farm_id: farmId,
      date: props.date,
      start_date: props.startDate,
      end_date: props.endDate,
    }
  }
}
