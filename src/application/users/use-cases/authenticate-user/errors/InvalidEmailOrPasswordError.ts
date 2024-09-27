

export class InvalidEmailOrPasswordError extends Error {
  constructor() {
    super(('account.invalid_email_username_or_password'))
    this.name = 'InvalidEmailOrPasswordError'
  }
}
