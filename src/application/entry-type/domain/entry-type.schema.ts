import { z } from 'zod'

export enum Categories {
  EXPENSE = 'EXPENSE',
  PROFIT = 'PROFIT',
  ASSET = 'ASSET'
}

export const CategoriesSchema = z.nativeEnum(Categories)

export const EntryTypeSchema = z.object({
  name: z.string().min(1).max(64),
  category: CategoriesSchema
})

export enum Roles {
  OWNER = 'OWNER',
  WORKER = 'WORKER'
}

export type EntryTypeProps = z.infer<typeof EntryTypeSchema>
