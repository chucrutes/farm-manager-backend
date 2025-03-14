import { z } from 'zod'
import { EntryTypeSchema } from '@/application/entry-type/domain/entry-type.schema'
import { IdSchema } from '@/application/@types'

export const EntrySchema = z.object({
  description: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  commission: z.number().nullish(),
  afterTax: z.number(),
})
export const EntryRequestSchema = EntrySchema.merge(
  z.object({
    type: EntryTypeSchema.merge(IdSchema),
  }),
)
export type EntryProps = z.infer<typeof EntrySchema>
