import { EntryType, type Relations } from '../domain/entry-type'
import { Categories, type EntryTypeProps } from '../domain/entry-type.schema'
import { faker } from '@faker-js/faker'
type DefaultProperties = Partial<EntryTypeProps>
type CreateOverrides = DefaultProperties & { id?: string }

export class EntryTypeFactory {
  static create(overrides?: CreateOverrides, relations?: Relations) {
    const entity = EntryType.create(
      {
        name:
          overrides?.name ||
          `${faker.lorem.word()}-${faker.number.float({ fractionDigits: 2 })}`,
        category: overrides?.category || Categories.ASSET,
        commission:
          overrides?.commission || faker.number.float({ fractionDigits: 2 }),
      },
      overrides?.id,
      undefined,
      relations,
    )

    return entity.value as EntryType
  }

  static createMany(overrides?: CreateOverrides[], relations?: Relations) {
    return (
      overrides?.map((override) =>
        EntryTypeFactory.create(override, relations),
      ) || [EntryTypeFactory.create({}, relations)]
    )
  }
}
