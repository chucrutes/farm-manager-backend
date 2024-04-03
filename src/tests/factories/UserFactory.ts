import { JWT } from '@/core/domain/jwt'
import { User } from '@/application/users/domain/user'
import { UserProps } from '@/application/users/domain/user.schema'

type UserOverrides = Partial<UserProps>

export class UserFactory {
  static create(overrides?: UserOverrides) {
    const email = `test-${Math.random()}-${Math.random()}@test.com`

    const user = User.create({
      name: 'test',
      email: overrides?.email || email,
      password: overrides?.password || '12345678',
      emailVerified: overrides?.emailVerified || true,
      username: overrides?.username || null
    })

    return user.value as User
  }

  static createMany(overrides?: UserOverrides[]) {
    return (
      overrides?.map((override) => UserFactory.create(override)) || [
        UserFactory.create()
      ]
    )
  }

  static createAndAuthenticate(overrides?: UserOverrides) {
    const user = UserFactory.create(overrides)
    const jwt = JWT.signUser(user)

    return {
      user,
      jwt
    }
  }

  static createAndAuthenticateMany(overrides?: UserOverrides[]) {
    const users = overrides?.map((user) => UserFactory.create(user)) || [
      UserFactory.create()
    ]
    const jwts = users.map((user) => JWT.signUser(user))

    return {
      users,
      jwts
    }
  }
}
