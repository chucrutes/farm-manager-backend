import type { Entry, Relations } from '../domain/entry'
import type { PartialIncludes } from '@/core/domain/entity'
import type { ListOptions, ListResponse } from '@/application/@types'

export type IncludeRelations = PartialIncludes<Relations>
export type EntryListResponse = ListResponse<Entry>
export type EntryListOptions = ListOptions<IncludeRelations>
