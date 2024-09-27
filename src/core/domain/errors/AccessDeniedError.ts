
export class AccessDeniedError extends Error {
  constructor() {
    super(('errors.access_denied'))
    this.name = 'AccessDeniedError'
  }
}
