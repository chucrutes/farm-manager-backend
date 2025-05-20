import { faker } from '@faker-js/faker'
import { Register } from '../domain/register'
import type { RegisterProps } from '../domain/register.schema'

type DefaultProperties = Partial<RegisterProps>
type CreateOverrides = DefaultProperties & { id?: string }

const ONE_HUNDRED_THOUSAND = 100000

export function registerFaker(): RegisterProps {
  return {
    name: faker.string.alpha(),
    date: faker.date.recent(),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    totalExpense: faker.number.int({ min: ONE_HUNDRED_THOUSAND }),
    totalIncome: faker.number.int({ min: ONE_HUNDRED_THOUSAND }),
  }
}

export class RegisterFactory {
  static create(overrides?: CreateOverrides) {
    const fakeData = registerFaker()

    const register = Register.create({
      name: overrides?.name || fakeData.name,
      endDate: overrides?.endDate || fakeData.endDate,
      startDate: overrides?.startDate || fakeData.startDate,
      totalExpense: overrides?.totalExpense || fakeData.totalExpense,
      totalIncome: overrides?.totalIncome || fakeData.totalIncome,
      date: overrides?.date || new Date(),
    })

    return register.value as Register
  }

  static createMany(overrides?: CreateOverrides[]) {
    return (
      overrides?.map((override) => RegisterFactory.create(override)) || [
        RegisterFactory.create(),
      ]
    )
  }
}
