import { Farm } from '@/application/farms/domain/farm'
import { Entry } from '@/application/entries/domain/entry'
import { Types } from '@/application/entries/domain/@types/types.enum'
import { EntryAttributes } from '@/application/entries/domain/entry.schema'
import { Categories } from '@/application/entries/domain/@types/categories.enum'

type EntryOverrides = Partial<Omit<EntryAttributes, 'farmId'>> & {
  farm?: Farm
  id?: string
}

export class EntryFactory {
  static create(overrides: EntryOverrides) {
    const user = Entry.create(
      {
        category: Categories.ASSET,
        description: overrides?.description || 'test-description',
        price: overrides?.price || 20,
        quantity: overrides?.quantity || 40,
        total: overrides?.total || 800,
        type: overrides?.type || Types.INVESTMENT
      },
      overrides.id,
      { farm: overrides.farm }
    )

    return user.value as Entry
  }

  static createMany(overrides: EntryOverrides[]) {
    return overrides.map((override) => EntryFactory.create(override))
  }
}
