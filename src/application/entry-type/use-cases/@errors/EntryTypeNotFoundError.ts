import { t } from 'i18next'
import { LANG_ENTITY } from '../../domain/entry-type'

export class EntryTypeNotFoundError extends Error {
  constructor() {
    super(t(`${LANG_ENTITY}.not_found`))
    this.name = 'EntryTypeNotFoundError'
  }
}
