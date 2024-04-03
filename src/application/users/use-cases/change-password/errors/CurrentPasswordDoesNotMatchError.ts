import { t } from 'i18next'

export class CurrentPaswordDoesNotMatchError extends Error {
  constructor() {
    super(t('password.old_password_not_match'))
    this.name = 'CurrentPaswordDoesNotMatchError'
  }
}
