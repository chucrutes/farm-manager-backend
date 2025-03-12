import { z } from 'zod'

export const NullishIdSchema = z.object({
  id: z.string().cuid2().nullish(),
})
export const IdSchema = z.object({
  _id: z.string().cuid2(),
})

export type Id = z.infer<typeof IdSchema>
export type NullishIdId = z.infer<typeof NullishIdSchema>

export const PaginationSchema = z.object({
  page: z.number().nullish(),
  limit: z.number().nullish(),
  sortBy: z.string().nullish(),
  sortOrder: z.enum(['asc', 'desc']).nullish(),
})
export type Pagination = z.infer<typeof PaginationSchema>
export const PaginationMetadataSchema = z.object({
  totalCount: z.number(),
  currentPage: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
})
export type PaginationMetadata = z.infer<typeof PaginationMetadataSchema>

export type ListResponse<T> = { data: T[]; metadata: PaginationMetadata }
export type ListOptions<T> = {
  includes?: T
  pagination?: Pagination
}
