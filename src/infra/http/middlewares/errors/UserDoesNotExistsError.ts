
export class UserDoesNotExistsError extends Error {
  constructor() {
    super(('user.does_not_exist'))
    this.name = 'UserDoesNotExistError'
  }
}
