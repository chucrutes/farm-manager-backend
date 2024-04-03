import { t } from 'i18next'

export class OtpNotCreatedError extends Error {
  constructor() {
    super(t('otp.not_created'))
    this.name = 'OtpNotCreatedError'
  }
}
