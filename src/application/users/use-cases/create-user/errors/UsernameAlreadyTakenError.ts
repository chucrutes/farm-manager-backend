

export class UsernameAlreadyTakenError extends Error {
  constructor() {
    super(('user.username_taken'))
    this.name = 'UsernameAlreadyTakenError'
  }
}
