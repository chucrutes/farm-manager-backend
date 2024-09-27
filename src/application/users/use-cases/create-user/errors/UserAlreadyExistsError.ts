

export class UserAlreadyExistsError extends Error {
  constructor() {
    super(('users.already_exists'))
    this.name = 'UserAlreadyExistsError'
  }
}
