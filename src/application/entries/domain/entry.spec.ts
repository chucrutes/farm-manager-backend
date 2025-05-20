import { Entry } from './entry'
import { describe, expect, test } from 'vitest'
import { EntryFactory } from '../test/entry.factory'
import { Categories } from '@/application/entry-type/domain/entry-type.schema'
import { EntryTypeFactory } from '@/application/entry-type/test/entry-types.factory'

describe('Entity Entry', () => {
  test('should be able to subtract commission if type is income', () => {
    const price = 40
    const quantity = 2
    const commission = 2
    const type = EntryTypeFactory.create({
      category: Categories.INCOME,
      commission: true,
      name: 'income'
    })

    const data = EntryFactory.create(
      {
        commission,
        price,
        quantity
      },
      { type }
    ).props

    const sut = Entry.create(data, undefined, undefined, { type })
    expect(sut.isRight()).toBeTruthy()

    const responseAsEntry = sut.value as Entry
    expect(responseAsEntry.afterTax).toEqual(price * quantity - commission)
  })

  test('should be able to sum commission if type is expense', () => {
    const price = 40
    const quantity = 2
    const commission = 2
    const type = EntryTypeFactory.create({
      category: Categories.EXPENSE,
      commission: true,
      name: 'expense'
    })

    const data = EntryFactory.create(
      {
        commission,
        price,
        quantity
      },
      { type }
    ).props

    const sut = Entry.create(data, undefined, undefined, { type })
    const responseAsEntry = sut.value as Entry

    expect(responseAsEntry.afterTax).toEqual(price * quantity + commission)
  })
})
