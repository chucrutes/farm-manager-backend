import { faker } from '@faker-js/faker'
import { Entry, type Relations } from '../domain/entry'
import type { EntryProps } from '../domain/entry.schema'
type DefaultProperties = Partial<EntryProps>
type CreateOverrides = DefaultProperties & { id?: string }

export class EntryFactory {
  static create(overrides?: CreateOverrides, relations?: Relations) {
    const entity = Entry.create(
      {
        description:
          overrides?.description ||
          `${faker.lorem.word()}-${faker.number.float({ fractionDigits: 2 })}`,
        price: overrides?.price || faker.number.int({ max: 10 }),
        quantity: overrides?.quantity || faker.number.int({ max: 10 }),
        total: overrides?.total || faker.number.int({ max: 10 }),
        commission: overrides?.commission || null,
      },
      overrides?.id,
      undefined,
      relations,
    )

    return entity.value as Entry
  }

  static createMany(overrides?: CreateOverrides[], relations?: Relations) {
    return (
      overrides?.map((override) =>
        EntryFactory.create(override, relations),
      ) || [EntryFactory.create({}, relations)]
    )
  }
}
