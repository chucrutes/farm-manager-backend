import type zod from 'zod'

export class ZodValidationError extends Error {
  constructor(error?: zod.ZodError) {
    super(
      `Field [${error?.issues?.[0].path?.[0] ?? 'Invalid data'}]: ${
        error?.issues?.[0].message ?? 'Invalid data'
      }`
    )
    this.name = 'ZodValidationError'
  }
}
