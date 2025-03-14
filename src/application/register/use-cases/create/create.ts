import { Register } from '../../domain/register'
import { type Either, left, right } from '@/core/logic/either'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'
import type {
  DataByCategory,
  IEntriesRepository,
} from '@/application/entries/repositories/IEntriesRepository'
import type { Farm } from '@/application/farms/domain/farm'
import { Categories } from '@/application/entries/domain/@types/categories.enum'
import { NothingToCloseError } from '../@errors/NothingToCloseError'

export type CreateRegisterRequest = {
  farm: Farm
}

type CreateRegisterResponse = Either<Error, Register>

type CreateOrUpdateEntryProps = {
  entriesRepository: IEntriesRepository
  registersRepository: IRegistersRepository
}

export class CreateRegister {
  private entriesRepository: IEntriesRepository
  private registersRepository: IRegistersRepository

  constructor(props: CreateOrUpdateEntryProps) {
    this.entriesRepository = props.entriesRepository
    this.registersRepository = props.registersRepository
  }

  async execute({
    farm,
  }: CreateRegisterRequest): Promise<CreateRegisterResponse> {
    const range = await this.entriesRepository.getOpenEntriesRangeByFarmId(
      farm.id,
    )
    const data = await this.entriesRepository.getDataByCategory(farm.id, null)
    const { income: totalIncome, expense: totalExpense } =
      this.getCategoriesSum(data)

    if (totalIncome === 0 && totalExpense === 0) {
      return left(new NothingToCloseError())
    }

    const registerOrError = Register.create(
      {
        name: `Caixa ${range.min.toString()}-${range.max.toString()}`,
        date: new Date(),
        startDate: range.min,
        endDate: range.max,
        totalExpense,
        totalIncome,
      },
      undefined,
      undefined,
      { farm },
    )

    if (registerOrError.isLeft()) {
      return left(registerOrError.value)
    }

    const register = registerOrError.value
    await this.registersRepository.createOrUpdate(register)
    return right(register)
  }

  getCategoriesSum(data: DataByCategory[]): {
    income: number
    expense: number
  } {
    const expense =
      data.find((item) => item.category === Categories.EXPENSE)?.sum ?? 0
    const income =
      data.find((item) => item.category === Categories.INCOME)?.sum ?? 0

    return {
      income,
      expense,
    }
  }
}
