import type { Register, Relations } from '../domain/register'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'

export interface IRegistersRepository
  extends ICrudRepository<Register, Relations> {}
