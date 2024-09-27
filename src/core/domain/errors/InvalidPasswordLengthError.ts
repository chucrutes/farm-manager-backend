
export class InvalidPasswordLengthError extends Error {
  constructor() {
    super(('errors.jwt_password_length'))
    this.name = 'InvalidPasswordLengthError'
  }
}
