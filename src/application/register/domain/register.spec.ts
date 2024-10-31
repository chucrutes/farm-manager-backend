import { Register, LANG_ENTITY } from './register'
import { describe, expect, test } from 'vitest'

describe('Entity Register', () => {
  test(`should be able to create a ${LANG_ENTITY}`, () => {
    const data = {
      date: new Date()
    }
    const sut = Register.create(data)
    expect(sut.isRight()).toBeTruthy()
  })
})
