import { t } from 'i18next'
import { LANG_ENTITY } from '../../domain/farm'

export class FarmNotFoundError extends Error {
  constructor() {
    super(t(`${LANG_ENTITY}.not_found`))
    this.name = 'FarmNotFoundError'
  }
}
