import { LANG_ENTITY } from '../domain/entry'

export class EntryNotFoundError extends Error {
  constructor() {
    super(`${LANG_ENTITY}.not_found`)
    this.name = 'EntryNotFoundError'
  }
}
