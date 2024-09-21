import { Farm } from '../domain/farm'
import { ICrudRepository } from '@/core/domain/ICrudRepository'
import { Roles } from '../domain/farm.schema'

export interface IFarmsRepository extends ICrudRepository<Farm> {
  addMember(userId: string, farmId: string, role: Roles): Promise<void>
  getFarmByUserId(userId: string): Promise<Farm | null>
}
