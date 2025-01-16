import { Farm } from '@/application/farms/domain/farm'
import { FarmProps } from '@/application/farms/domain/farm.schema'
import { faker } from '@faker-js/faker'

type DefaultProperties = Partial<FarmProps>
type CreateOverrides = DefaultProperties & { id?: string }

export class FarmFactory {
  static create(overrides?: CreateOverrides) {
    const farm = Farm.create({
      name:
        overrides?.name ||
        faker.lorem.word() +
          '-' +
          faker.number.float({ fractionDigits: 2 }).toString(),
    })

    return farm.value as Farm
  }

  static createMany(overrides?: CreateOverrides[]) {
    return (
      overrides?.map((override) => FarmFactory.create(override)) || [
        FarmFactory.create(),
      ]
    )
  }
}
