import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config({ path: ['.env.local'], override: true })

const configs = z.object({
  PORT: z.coerce.number().optional(),
  BASE_URL: z.string().optional(),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_EXPIRES_IN: z.string().default('1d'),
  HOSTINGER_EMAIL_HOST: z.string(),
  HOSTINGER_EMAIL_PORT: z.coerce.number(),
  HOSTINGER_EMAIL_USER: z.string(),
  HOSTINGER_EMAIL_PASSWORD: z.string(),
})

export const env = configs.parse(process.env)
