import type { IncludeRelations } from '../../@types'
import type { Register } from '../../domain/register'
import { left, right, type Either } from '@/core/logic/either'
import type { ListResponse, Pagination } from '@/application/@types'
import type { IRegistersRepository } from '../../repositories/IRegistersRepository'
import type { IFarmsRepository } from '@/application/farms/repositories/IFarmsRepository'
import { FarmNotFoundError } from '@/application/farms/use-cases/@errors/FarmNotFoundError'

export type ListRegisterRequest = {
  userId: string
  includes?: IncludeRelations
  pagination?: Pagination
}

type RightResponse = ListResponse<Register>

type ListRegisterResponse = Either<Error, RightResponse>

type ListRegisterProps = {
  registersRepository: IRegistersRepository
  farmsRepository: IFarmsRepository
}

export class ListRegister {
  private registersRepository: IRegistersRepository
  private farmsRepository: IFarmsRepository
  constructor(props: ListRegisterProps) {
    this.registersRepository = props.registersRepository
    this.farmsRepository = props.farmsRepository
  }

  async execute({
    userId,
    includes,
    pagination,
  }: ListRegisterRequest): Promise<ListRegisterResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)
    if (!farm) {
      return left(new FarmNotFoundError())
    }
    const farmId = farm.id
    const registers = await this.registersRepository.getAllByFarmId(farmId, {
      includes,
      pagination,
    })

    return right(registers)
  }
}
