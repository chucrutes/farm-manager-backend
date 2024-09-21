import { EntryType } from '../domain/entry-type'
import { Categories, EntryTypeProps } from '../domain/entry-type.schema'

type DefaultProperties = Partial<EntryTypeProps>
type CreateOverrides = DefaultProperties & { id?: string }

export class EntryTypeFactory {
  static create(overrides?: CreateOverrides) {
    const farm = EntryType.create({
      name: overrides?.name || 'test-name',
      category: overrides?.category || Categories.ASSET
    })

    return farm.value as EntryType
  }

  static createMany(overrides?: CreateOverrides[]) {
    return (
      overrides?.map((override) => EntryTypeFactory.create(override)) || [
        EntryTypeFactory.create()
      ]
    )
  }
}
