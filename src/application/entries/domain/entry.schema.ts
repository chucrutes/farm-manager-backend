import { z } from 'zod'
import { Categories } from './@types/categories.enum'

export const EntrySchema = z.object({
  description: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  category: z.nativeEnum(Categories)
})

export type EntryProps = z.infer<typeof EntrySchema>
