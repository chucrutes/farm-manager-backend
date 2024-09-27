

export class UserDoesNotExistError extends Error {
  constructor() {
    super(('user.does_not_exist'))
    this.name = 'UserDoesNotExistError'
  }
}
