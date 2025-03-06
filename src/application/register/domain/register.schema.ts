import { z } from 'zod'

export const RegisterSchema = z.object({
  date: z.date(),
  startDate: z.date(),
  endDate: z.date()
})

export type RegisterProps = z.infer<typeof RegisterSchema>
