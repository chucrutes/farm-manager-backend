import { t } from 'i18next'
import { Categories } from '../domain/entry-type.schema'
import { EntryType, LANG_ENTITY } from '../domain/entry-type'
import { EntryType as PersistenceEntryType } from '@prisma/client'

export class EntryTypeMapper {
  static toDomain(raw: PersistenceEntryType) {
    const entityOrError = EntryType.create(
      {
        name: raw.name,
        category: raw.category as Categories
      },
      raw.id
    )

    if (entityOrError.isLeft()) {
      throw new Error(t(`errors.invalid_${LANG_ENTITY}`))
    }

    return entityOrError.value
  }

  static toPersistence(
    entity: EntryType
  ): Omit<PersistenceEntryType, 'created_at' | 'updated_at' | 'deleted_at'> {
    const { id, props, farm } = entity
    const farmId = farm?.id

    if (!farmId) {
      throw new Error('No farmId provided')
    }

    return {
      id: id,
      name: props.name,
      category: props.category,
      farm_id: farmId
    }
  }
}
