import { Entry } from './entry'
import { describe, expect, test } from 'vitest'
import { EntryFactory } from '../test/entry.factory'
import { Categories } from '@/application/entry-type/domain/entry-type.schema'
import { EntryTypeFactory } from '@/application/entry-type/test/entry-types.factory'

describe('Entity Entry', () => {
  test('should be able to calculate tax', () => {
    const type = EntryTypeFactory.create({
      category: Categories.INCOME,
      commission: true,
      name: 'expense',
    })
    const data = EntryFactory.create({
      commission: 10,
      price: 40,
      quantity: 2,
      total: 80,
    }).props
    const sut = Entry.create(data, undefined, undefined, { type })
    expect(sut.isRight()).toBeTruthy()
    const responseAsEntry = sut.value as Entry
    expect(responseAsEntry.getAfterTax).toEqual(72)
  })
})
