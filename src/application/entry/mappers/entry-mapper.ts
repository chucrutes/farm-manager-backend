import { t } from 'i18next'
import { Entry } from '../domain/entry'
import { Types } from '../domain/@types/types.enum'
import { Entry as PersistenceEntry } from '@prisma/client'
import { Categories } from '../domain/@types/categories.enum'

export class EntryMapper {
  static toDomain(raw: PersistenceEntry) {
    const entryOrError = Entry.create(
      {
        farmId: raw.farm_id,
        category: raw.category as Categories,
        type: raw.type as Types,
        description: raw.description,
        price: raw.price,
        quantity: raw.quantity,
        total: raw.total,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    )

    if (entryOrError.isLeft()) {
      throw new Error(t('errors.invalid_entry'))
    }

    return entryOrError.value
  }

  static async toPersistence(
    entry: Entry,
  ): Promise<Omit<PersistenceEntry, 'created_at' | 'updated_at'>> {
    const { id, props } = entry

    return {
      id: id,
      farm_id: props.farmId,
      description: props.description,
      category: props.category,
      type: props.type,
      price: props.price,
      quantity: props.quantity,
      total: props.total,
    }
  }
}
