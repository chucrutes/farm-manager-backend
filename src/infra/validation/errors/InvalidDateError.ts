import { t } from 'i18next'

export class InvalidDateError extends Error {
  constructor() {
    super(t('date.invalid'))
    this.name = 'InvalidDateError'
  }
}
