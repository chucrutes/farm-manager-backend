import { z } from 'zod'

export enum Categories {
  EXPENSE = 'EXPENSE',
  PROFIT = 'PROFIT',
  ASSET = 'ASSET'
}

export const categoriesSchema = z.nativeEnum(Categories)
