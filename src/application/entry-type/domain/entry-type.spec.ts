import { EntryType, LANG_ENTITY } from './entry-type'
import { describe, expect, test } from 'vitest'
import { Categories, EntryTypeProps } from './entry-type.schema'

describe(`Entity ${LANG_ENTITY}`, () => {
  test(`should be able to create a ${LANG_ENTITY}`, () => {
    const data: EntryTypeProps = {
      name: 'test',
      category: Categories.EXPENSE
    }
    const sut = EntryType.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test(`should not be able to create a ${LANG_ENTITY} with invalid data`, () => {
    const data: EntryTypeProps = {
      name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      category: Categories.EXPENSE
    }
    const sut = EntryType.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
