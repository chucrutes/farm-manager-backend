import type { Register, Relations } from '../domain/register'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'
import type { RegisterListOptions, RegisterListResponse } from '../@types'

export interface IRegistersRepository
  extends ICrudRepository<Register, Relations> {
  getAllByFarmId(
    farmId: string,
    options?: RegisterListOptions
  ): Promise<RegisterListResponse>
  restoreEntriesByRegister(register: Register): Promise<void>
}
