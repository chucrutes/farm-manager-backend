import { LANG_ENTITY } from '../../domain/entry-type'

export class EntryTypeWithTheSameNameError extends Error {
  constructor() {
    super(`${LANG_ENTITY}.with_the_same_name`)
    this.name = 'EntryTypeWithTheSameNameError'
  }
}
