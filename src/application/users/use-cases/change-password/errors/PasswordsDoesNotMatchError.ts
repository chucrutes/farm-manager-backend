import { t } from 'i18next'

export class PasswordsDoesNotMatchError extends Error {
  constructor() {
    super(t('password.passwords_does_not_match'))
    this.name = 'PasswordsDoesNotMatchError'
  }
}
