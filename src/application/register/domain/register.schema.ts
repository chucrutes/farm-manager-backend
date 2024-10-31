import { z } from 'zod'

export const RegisterSchema = z.object({
  date: z.date()
})

export type RegisterProps = z.infer<typeof RegisterSchema>
