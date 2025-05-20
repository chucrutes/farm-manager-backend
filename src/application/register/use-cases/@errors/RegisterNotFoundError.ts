import { LANG_ENTITY } from '../../domain/register'

export class RegisterNotFoundError extends Error {
  constructor() {
    super(`${LANG_ENTITY}.not_found`)
    this.name = 'RegisterNotFoundError'
  }
}
