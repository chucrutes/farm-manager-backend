import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config({ path: ['.env.local'], override: true })

const configs = z.object({
  PORT: z.coerce.number().optional(),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d')
})

export const env = configs.parse(process.env)
