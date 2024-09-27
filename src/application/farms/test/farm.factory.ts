import { Farm } from '@/application/farms/domain/farm'
import { FarmAttributes } from '@/application/farms/domain/farm.schema'

type DefaultProperties = Partial<FarmAttributes>
type CreateOverrides = DefaultProperties & { id?: string }

export class FarmFactory {
  static create(overrides?: CreateOverrides) {
    const farm = Farm.create({
      name: overrides?.name || 'test-name'
    })

    return farm.value as Farm
  }

  static createMany(overrides?: CreateOverrides[]) {
    return (
      overrides?.map((override) => FarmFactory.create(override)) || [
        FarmFactory.create()
      ]
    )
  }
}
