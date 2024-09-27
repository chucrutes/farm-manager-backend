
import { LANG_ENTITY } from '../../domain/farm'

export class FarmNotFoundError extends Error {
  constructor() {
    super((`${LANG_ENTITY}.not_found`))
    this.name = 'FarmNotFoundError'
  }
}
