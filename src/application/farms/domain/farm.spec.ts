import { Farm, LANG_ENTITY } from './farm'
import { describe, expect, test } from 'vitest'

describe('Entity Farm', () => {
  test(`should be able to create a ${LANG_ENTITY}`, () => {
    const data = {
      name: 'test'
    }
    const sut = Farm.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test(`should not be able to create a ${LANG_ENTITY} with invalid data`, () => {
    const data = {
      name: ''
    }
    const sut = Farm.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
