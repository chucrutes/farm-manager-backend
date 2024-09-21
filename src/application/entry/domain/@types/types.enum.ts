import { z } from 'zod'
import { Categories, categoriesSchema } from './categories.enum'

export enum Types {
  INVESTMENT_EXPENSE = 'INVESTMENT_EXPENSE',
  CATTLE_SALE = 'CATTLE_SALE',
  BUY_CATTLE = 'BUY_CATTLE',
  MEDICINE = 'MEDICINE',
  PESTICIDE = 'PESTICIDE',
  FEED = 'FEED',
  STAFF = 'STAFF',
  INVESTMENT = 'INVESTMENT',
}

export const typeSchema = z.object({
  name: z.nativeEnum(Types),
  key: z.string().min(1),
  category: categoriesSchema,
})

export type IType = z.infer<typeof typeSchema>

export const types: IType[] = [
  {
    name: Types.CATTLE_SALE,
    key: 'cattle_sale',
    category: Categories.PROFIT,
  },
  {
    name: Types.BUY_CATTLE,
    key: 'buy_cattle',
    category: Categories.EXPENSE,
  },
  {
    name: Types.MEDICINE,
    key: 'medicine',
    category: Categories.EXPENSE,
  },
  {
    name: Types.PESTICIDE,
    key: 'pesticide',
    category: Categories.EXPENSE,
  },
  {
    name: Types.FEED,
    key: 'feed',
    category: Categories.EXPENSE,
  },
  {
    name: Types.STAFF,
    key: 'staff',
    category: Categories.EXPENSE,
  },
  {
    name: Types.INVESTMENT,
    key: 'investment',
    category: Categories.ASSET,
  },
  {
    name: Types.INVESTMENT_EXPENSE,
    key: 'investment_expense',
    category: Categories.EXPENSE,
  },
]

export const findTypeByType = (type: string): IType | null => {
  const itemFound = types.find((item) => item.name === type)

  if (!itemFound) return null
  return itemFound || null
}
export const findTypeByKey = (key: string): IType | null => {
  const itemFound = types.find((item) => item.key === key)

  if (!itemFound) return null
  return itemFound || null
}

export const getCategory = {
  expense: () => {
    return 'Dívida'
  },
  profit: () => {
    return 'Lucro'
  },
  asset: () => {
    return 'Patrimônio'
  },
}
