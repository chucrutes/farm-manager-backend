import type { PartialIncludes } from '@/core/domain/entity'

type Return<T extends object> = PartialIncludes<T>

export const coerceRelations = <T extends object>(
  relations: Record<string, string>
): Return<T> => {
  const coercedRelations = {}

  const relationKeys = Object.keys(relations)

  for (const key of relationKeys) {
    coercedRelations[key] = relations[key] === 'true'
  }

  return coercedRelations
}
