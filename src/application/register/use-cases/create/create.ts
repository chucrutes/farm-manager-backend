import { Register } from '../../domain/register'
import { type Either, left, right } from '@/core/logic/either'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'
import type { IEntriesRepository } from '@/application/entries/repositories/IEntriesRepository'
import type { Farm } from '@/application/farms/domain/farm'

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

  async execute({farm}: CreateRegisterRequest): Promise<CreateRegisterResponse> {

    const range = await this.entriesRepository.getOpenEntriesRangeByFarmId(farm.id)

    const registerOrError = Register.create({
      date: new Date(),
      startDate: range.min,
      endDate: range.max
    })

    if (registerOrError.isLeft()) {
      return left(registerOrError.value)
    }

    const register = registerOrError.value
    await this.registersRepository.createOrUpdate(register)
    await this.entriesRepository.setClosedRegister(register)
    return right(register)
  }
}
