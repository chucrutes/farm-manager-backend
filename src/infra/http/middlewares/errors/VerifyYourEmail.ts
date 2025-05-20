export class VerifyYourEmail extends Error {
  constructor() {
    super('user.verify_your_email')
    this.name = 'VerifyYourEmail'
  }
}
