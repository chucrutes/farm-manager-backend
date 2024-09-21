import { ICrudRepository } from '@/core/domain/ICrudRepository'
import { EntryType } from '../domain/entry-type'

export interface IEntryTypesRepository extends ICrudRepository<EntryType> {}
