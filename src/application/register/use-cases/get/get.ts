import { type Either, left, right } from '@/core/logic/either'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import type { PartialIncludes } from '@/core/domain/entity'
import type { Register, Relations } from '../../domain/register'
import { RegisterNotFoundError } from '../@errors/RegisterNotFoundError'
import type { UseCase } from '@/core/domain/use-case'
import { FarmNotFoundError } from '@/application/farms/use-cases/@errors/FarmNotFoundError'

export type GetRegisterRequest = {
  _id: string
  userId: string
  includes: PartialIncludes<Relations>
}

type GetRegisterResponse = Either<Error, Register>

type ConstructorProps = {
  registerRepository: IRegistersRepository
  farmRepository: IFarmsRepository
}

export class GetRegister
  implements UseCase<GetRegisterRequest, GetRegisterResponse>
{
  private readonly registerRepository: IRegistersRepository
  private readonly farmRepository: IFarmsRepository

  constructor({ farmRepository, registerRepository }: ConstructorProps) {
    this.registerRepository = registerRepository
    this.farmRepository = farmRepository
  }

  async execute({
    _id,
    userId,
    includes
  }: GetRegisterRequest): Promise<GetRegisterResponse> {
    const register = await this.registerRepository.findById(_id, {
      ...includes,
      farm: true
    })
    if (!register) return left(new RegisterNotFoundError())

    const farm = await this.farmRepository.getFarmByUserId(userId)

    if (register.farm?.id !== farm?.id) {
      return left(new FarmNotFoundError())
    }

    return right(register)
  }
}
