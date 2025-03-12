import type { PartialIncludes } from '@/core/domain/entity'
import type { Register, Relations } from '../domain/register'
import type { ListOptions, ListResponse } from '@/application/@types'

export type IncludeRelations = PartialIncludes<Relations>
export type RegisterListResponse = ListResponse<Register>
export type RegisterListOptions = ListOptions<IncludeRelations>
