import { t } from 'i18next'

export class UsernameAlreadyTakenError extends Error {
  constructor() {
    super(t('user.username_taken'))
    this.name = 'UsernameAlreadyTakenError'
  }
}
