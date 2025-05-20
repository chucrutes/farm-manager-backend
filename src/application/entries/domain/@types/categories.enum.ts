import { z } from 'zod'

export enum Categories {
  EXPENSE = 'EXPENSE',
  INCOME = 'INCOME',
  ASSET = 'ASSET',
}

export const categoriesSchema = z.nativeEnum(Categories)
