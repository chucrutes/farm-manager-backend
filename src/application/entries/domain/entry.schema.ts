import { z } from 'zod'
import { Categories } from './@types/categories.enum'
import { EntryTypeSchema } from '@/application/entry-type/domain/entry-type.schema'
import { IdSchema } from '@/application/@types'

export const EntrySchema = z.object({
  description: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  category: z.nativeEnum(Categories)
})
export const EntryRequestSchema = EntrySchema.merge(
  z.object({
    type: EntryTypeSchema.merge(IdSchema)
  })
)
export type EntryProps = z.infer<typeof EntrySchema>
