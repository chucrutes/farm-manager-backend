import { LANG_ENTITY } from '../../domain/register'

export class NothingToCloseError extends Error {
  constructor() {
    super(`${LANG_ENTITY}.nothing_to_close`)
    this.name = 'NothingToCloseError'
  }
}
