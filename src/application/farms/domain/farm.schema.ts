import { z } from 'zod'

export const FarmSchema = z.object({
  name: z.string().min(1).max(64)
})
export enum Roles {
  OWNER = 'OWNER',
  WORKER = 'WORKER'
}

export type FarmAttributes = z.infer<typeof FarmSchema>
