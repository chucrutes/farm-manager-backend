import type { Pagination, PaginationMetadata } from '@/application/@types'

export const buildMetadata = (
  totalCount: number,
  rows: number,
  pagination?: Pagination,
): PaginationMetadata => {
  const currentPage = pagination?.page || 1
  const pageSize = pagination?.limit || rows
  const totalPages = pagination?.limit
    ? Math.ceil(totalCount / pagination.limit)
    : 1

  return {
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  }
}

export const buildPagination = (pagination?: Pagination) => {
  let skip: number | undefined
  let take: number | undefined
  let orderBy: any | undefined

  if (pagination) {
    const { page, limit, sortBy, sortOrder } = pagination

    if (page && limit) {
      skip = (page - 1) * limit
      take = limit
    }

    if (sortBy && sortOrder) {
      orderBy = {
        [sortBy]: sortOrder,
      }
    }
  }

  return {
    skip,
    take,
    orderBy,
  }
}
