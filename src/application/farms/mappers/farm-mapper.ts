import { t } from 'i18next'
import { Farm } from '../domain/farm'
import { Farm as PersistenceFarm } from '@prisma/client'

export class FarmMapper {
  static toDomain(raw: PersistenceFarm) {
    const farmOrError = Farm.create(
      {
        name: raw.name
      },
      raw.id
    )

    if (farmOrError.isLeft()) {
      throw new Error(t('errors.invalid_farm'))
    }

    return farmOrError.value
  }

  static toPersistence(
    farm: Farm
  ): Omit<PersistenceFarm, 'created_at' | 'updated_at' | 'deleted_at'> {
    const { id, props } = farm

    return {
      id: id,
      name: props.name
    }
  }
}
