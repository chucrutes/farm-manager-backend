import { Farm } from '@/application/farms/domain/farm'
import { FarmProps } from '@/application/farms/domain/farm.schema'

type DefaultProperties = Partial<FarmProps>
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
