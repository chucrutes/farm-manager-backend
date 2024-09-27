

export class CurrentPaswordDoesNotMatchError extends Error {
  constructor() {
    super(('password.old_password_not_match'))
    this.name = 'CurrentPaswordDoesNotMatchError'
  }
}
