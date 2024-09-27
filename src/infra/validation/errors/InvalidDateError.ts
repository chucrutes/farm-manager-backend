
export class InvalidDateError extends Error {
  constructor() {
    super(('date.invalid'))
    this.name = 'InvalidDateError'
  }
}
