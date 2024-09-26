import { z } from 'zod'

export const NullishIdSchema = z.object({
  id: z.string().cuid2().nullish()
})
export const IdSchema = z.object({
  id: z.string().cuid2().nullish()
})

export type Id = z.infer<typeof IdSchema>
export type NullishIdId = z.infer<typeof NullishIdSchema>
