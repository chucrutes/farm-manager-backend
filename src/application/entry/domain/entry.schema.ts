import { z } from 'zod'
import { Types } from './@types/types.enum'
import { Categories } from './@types/categories.enum'

export const EntrySchema = z.object({
  farmId: z.string().cuid2(),
  description: z.string().min(1),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
  type: z.nativeEnum(Types),
  category: z.nativeEnum(Categories),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
})

export type EntryProps = z.infer<typeof EntrySchema>
