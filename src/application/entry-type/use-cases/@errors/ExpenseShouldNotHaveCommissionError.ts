import { LANG_ENTITY } from '../../domain/entry-type'

export class ExpenseShouldNotHaveCommissionError extends Error {
  constructor() {
    super(`${LANG_ENTITY}.expense_should_not_have_commission`)
    this.name = 'ExpenseShouldNotHaveCommissionError'
  }
}
