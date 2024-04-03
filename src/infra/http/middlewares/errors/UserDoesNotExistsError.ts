import { t } from 'i18next'

export class UserDoesNotExistsError extends Error {
  constructor() {
    super(t('user.does_not_exist'))
    this.name = 'UserDoesNotExistError'
  }
}
