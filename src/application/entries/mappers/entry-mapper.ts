
import { Entry } from '../domain/entry'
import {
  Entry as PersistenceEntry,
  EntryType as PersistenceEntryType
} from '@prisma/client'
import { Categories } from '../domain/@types/categories.enum'
import { EntryTypeMapper } from '@/application/entry-type/mappers/entry-type.mapper'

type Raw = PersistenceEntry & {
  type?: PersistenceEntryType
}

export class EntryMapper {
  static toDomain(raw: Raw) {
    const entryOrError = Entry.create(
      {
        category: raw.category as Categories,
        description: raw.description,
        price: raw.price,
        quantity: raw.quantity,
        total: raw.total
      },
      raw.id,
      {
        type: raw.type && EntryTypeMapper.toDomain(raw.type)
      }
    )

    if (entryOrError.isLeft()) {
      throw new Error(('errors.invalid_entry'))
    }

    return entryOrError.value
  }

  static async toPersistence(
    entry: Entry
  ): Promise<
    Omit<PersistenceEntry, 'created_at' | 'updated_at' | 'deleted_at'>
  > {
    const { id, props, farm, type } = entry

    const farmId = farm?.id
    if (!farmId) {
      throw new Error('no farmId provided')
    }
    const typeId = type?.id
    if (!typeId) {
      throw new Error('no typeId provided')
    }

    return {
      id: id,
      farm_id: farmId,
      type_id: typeId,
      description: props.description,
      category: props.category,
      price: props.price,
      quantity: props.quantity,
      total: props.total
    }
  }
}
