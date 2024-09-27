
export class InvalidJWTTokenError extends Error {
  constructor() {
    super(('errors.invalid_jwt_token'))
    this.name = 'InvalidJWTTokenError'
  }
}
