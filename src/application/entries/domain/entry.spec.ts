import { Entry } from './entry'
import { describe, expect, test } from 'vitest'
import { EntryFactory } from '../test/entry.factory'
import { Categories } from '@/application/entry-type/domain/entry-type.schema'
import { EntryTypeFactory } from '@/application/entry-type/test/entry-types.factory'
import {
  calculatePercentage,
  calculateTotalAfterCommission,
} from '@/utils/number.utils'

describe('Entity Entry', () => {
  test('should be able to calculate tax', () => {
    const price = 40
    const quantity = 2
    const commission = 2
    const total = price * quantity
    const type = EntryTypeFactory.create({
      category: Categories.INCOME,
      commission: true,
      name: 'expense',
    })
    const data = EntryFactory.create({
      commission,
      price,
      quantity,
    }).props
    const sut = Entry.create(data, undefined, undefined, { type })
    expect(sut.isRight()).toBeTruthy()
    const responseAsEntry = sut.value as Entry
    expect(responseAsEntry.getAfterTax).toEqual(
      calculateTotalAfterCommission(total, calculatePercentage(commission)),
    )
  })
})
