import type { Farm, Relations } from '../domain/farm'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { Roles } from '../domain/farm.schema'

export interface IFarmsRepository extends ICrudRepository<Farm, Relations> {
  addMember(userId: string, farmId: string, role: Roles): Promise<void>
  getFarmByUserId(userId: string): Promise<Farm | null>
}
