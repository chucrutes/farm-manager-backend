import { Categories } from '@/application/entry/domain/@types/categories.enum'
import { Types } from '@/application/entry/domain/@types/types.enum'
import { Entry } from '@/application/entry/domain/entry'
import { EntryProps } from '@/application/entry/domain/entry.schema'

type EntryOverrides = Partial<Omit<EntryProps, 'userId'>> & {
  userId: string
}

export class EntryFactory {
  static create(overrides: EntryOverrides) {
    const user = Entry.create({
      category: Categories.ASSET,
      description: overrides?.description || 'test-description',
      price: overrides?.price || 20,
      quantity: overrides?.quantity || 40,
      total: overrides?.total || 800,
      type: overrides?.type || Types.INVESTMENT,
      userId: overrides.userId
    })

    return user.value as Entry
  }

  static createMany(overrides: EntryOverrides[]) {
    return overrides.map((override) => EntryFactory.create(override))
  }
}
