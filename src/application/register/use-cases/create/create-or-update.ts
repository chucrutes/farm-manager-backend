import { Register } from '../../domain/register'
import { type Either, left, right } from '@/core/logic/either'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'

export type CreateRegisterRequest = {
  userId: string
}

type CreateRegisterResponse = Either<Error, Register>

export class CreateRegister {
  constructor(private readonly registersRepository: IRegistersRepository) {}

  async execute(): Promise<CreateRegisterResponse> {
    const registerOrError = Register.create({
      date: new Date()
    })

    if (registerOrError.isLeft()) {
      return left(registerOrError.value)
    }

    const register = registerOrError.value
    await this.registersRepository.createOrUpdate(register)
    return right(register)
  }
}
