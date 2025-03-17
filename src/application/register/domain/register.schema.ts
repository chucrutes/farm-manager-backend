import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().nullish(),
  date: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  totalIncome: z.number(),
  totalExpense: z.number(),
})

export type RegisterProps = z.infer<typeof RegisterSchema>
