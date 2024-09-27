

export class PasswordsDoesNotMatchError extends Error {
  constructor() {
    super(('password.passwords_does_not_match'))
    this.name = 'PasswordsDoesNotMatchError'
  }
}
