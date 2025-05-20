import { type Either, left, right } from '@/core/logic/either'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'
import { RegisterNotFoundError } from '../@errors/RegisterNotFoundError'

export type RestoreRegisterRequest = {
  registerId: string
}

type RestoreRegisterResponse = Either<Error, null>

type RestoreOrUpdateEntryProps = {
  registersRepository: IRegistersRepository
}

export class RestoreRegister {
  private registersRepository: IRegistersRepository

  constructor(props: RestoreOrUpdateEntryProps) {
    this.registersRepository = props.registersRepository
  }

  async execute({
    registerId,
  }: RestoreRegisterRequest): Promise<RestoreRegisterResponse> {
    const register = await this.registersRepository.findById(registerId)

    if (!register) {
      return left(new RegisterNotFoundError())
    }

    await this.registersRepository.restoreEntriesByRegister(register)
    return right(null)
  }
}
