import { t } from 'i18next'
import { User } from '../domain/user'
import { Password } from '@/core/domain/password'
import { User as PersistenceUser } from '@prisma/client'

export class UserMapper {
  static toDomain(raw: PersistenceUser) {
    const userOrError = User.create(
      {
        name: raw.name,
        username: raw.username,
        email: raw.email,
        password: raw.password,
        emailVerified: raw.email_verified,
        phone: raw.phone ?? ''
      },
      raw.id
    )

    if (userOrError.isLeft()) {
      throw new Error(t('errors.invalid_user'))
    }

    return userOrError.value
  }

  static async toPersistence(
    user: User
  ): Promise<Omit<PersistenceUser, 'created_at' | 'updated_at'>> {
    const hashed = Password.create(user.props.password, true)

    if (hashed.isLeft()) {
      throw new Error(t('errors.invalid_hash_password'))
    }

    return {
      id: user.id,
      name: user.props.name,
      username: user.props.username !== undefined ? user.props.username : null,
      email: user.props.email,
      password: await hashed.value.getHashedValue(),
      phone: user.props.phone !== undefined ? user.props.phone : null,
      email_verified: user.props.emailVerified || false
    }
  }
}
