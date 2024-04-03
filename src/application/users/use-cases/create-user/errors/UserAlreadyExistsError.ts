import { t } from 'i18next'

export class UserAlreadyExistsError extends Error {
  constructor() {
    super(t('users.already_exists'))
    this.name = 'UserAlreadyExistsError'
  }
}
