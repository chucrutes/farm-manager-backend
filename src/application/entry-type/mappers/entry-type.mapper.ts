import type { Categories } from '../domain/entry-type.schema'
import { EntryType, LANG_ENTITY } from '../domain/entry-type'
import type { EntryType as PersistenceEntryType } from '@prisma/client'
import { isNull } from '@/infra/prisma/is-null'

export class EntryTypeMapper {
  static toDomain(raw: PersistenceEntryType) {
    const entityOrError = EntryType.create(
      {
        name: raw.name,
        category: raw.category as Categories,
        commission: raw.commission,
      },
      raw.id,
      {
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
    )

    if (entityOrError.isLeft()) {
      throw new Error(`errors.invalid_${LANG_ENTITY}`)
    }

    return entityOrError.value
  }

  static toPersistence(
    entity: EntryType,
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
      commission: isNull(props.commission),
      farm_id: farmId,
    }
  }
}
