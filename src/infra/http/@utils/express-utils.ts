import type { Response } from 'express'

export const setResponseHeaders = (
  response: Response,
  headers?: Record<string, unknown>,
): Response => {
  if (!headers) return response

  Object.entries(headers).forEach(([key, value]) => {
    response.setHeader(key, String(value))
  })

  return response
}
