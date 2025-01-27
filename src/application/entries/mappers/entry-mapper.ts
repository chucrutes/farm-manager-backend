import { Entry } from '../domain/entry'
import type {
  Entry as PersistenceEntry,
  EntryType as PersistenceEntryType,
  Register,
} from '@prisma/client'
import { EntryTypeMapper } from '@/application/entry-type/mappers/entry-type.mapper'
import { RegisterMapper } from '@/application/register/mappers/register-mapper'

type Raw = PersistenceEntry & {
  type?: PersistenceEntryType
  register?: Register | null
}

export class EntryMapper {
  static toDomain(raw: Raw) {
    const entryOrError = Entry.create(
      {
        description: raw.description,
        price: raw.price,
        quantity: raw.quantity,
        total: raw.total,
        afterTax: raw.after_tax,
      },
      raw.id,
      {
        type: raw.type && EntryTypeMapper.toDomain(raw.type),
        register: raw.register && RegisterMapper.toDomain(raw.register),
      },
    )

    if (entryOrError.isLeft()) {
      throw new Error('errors.invalid_entry')
    }

    return entryOrError.value
  }

  static async toPersistence(
    entry: Entry,
  ): Promise<
    Omit<PersistenceEntry, 'created_at' | 'updated_at' | 'deleted_at'>
  > {
    const { id, props, farm, type, register } = entry

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
      price: props.price,
      quantity: props.quantity,
      total: props.total,
      after_tax: entry.afterTax,
      register_id: register ? register.id : null,
    }
  }
}
