import { Register } from '../domain/register'
import type { RegisterProps } from '../domain/register.schema'

type DefaultProperties = Partial<RegisterProps>
type CreateOverrides = DefaultProperties & { id?: string }

export class RegisterFactory {
  static create(overrides?: CreateOverrides) {
    const register = Register.create({
      date: overrides?.date || new Date()
    })

    return register.value as Register
  }

  static createMany(overrides?: CreateOverrides[]) {
    return (
      overrides?.map((override) => RegisterFactory.create(override)) || [
        RegisterFactory.create()
      ]
    )
  }
}
