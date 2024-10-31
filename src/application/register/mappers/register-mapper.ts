import { Register } from '../domain/register'
import type { Register as PersistenceRegister } from '@prisma/client'

export class RegisterMapper {
  static toDomain(raw: PersistenceRegister) {
    const registerOrError = Register.create(
      {
        date: raw.date
      },
      raw.id
    )

    if (registerOrError.isLeft()) {
      throw new Error('errors.invalid_register')
    }

    return registerOrError.value
  }

  static toPersistence(
    register: Register
  ): Omit<PersistenceRegister, 'created_at' | 'updated_at' | 'deleted_at'> {
    const { id, props } = register

    return {
      id: id,
      date: props.date
    }
  }
}
