import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(1).max(64),
  username: z.string().min(3).max(64).nullish(),
  email: z.string().email(),
  password: z.string().min(3).max(64),
  phone: z.string().max(255).nullish(),
  emailVerified: z.boolean().nullish()
})

export type UserAttributes = z.infer<typeof UserSchema>
