import type { Farm } from '../../domain/farm'
import { type Either, left, right } from '@/core/logic/either'
import { FarmNotFoundError } from '../@errors/FarmNotFoundError'
import type { IFarmsRepository } from '../../repositories/IFarmsRepository'

export type GetFarmByUserRequest =  {
  userId: string
}

type GetFarmByUserResponse = Either<Error, Farm>

export class GetFarmByUser {
  constructor(private readonly farmsRepository: IFarmsRepository) {}

  async execute({
    userId
  }: GetFarmByUserRequest): Promise<GetFarmByUserResponse> {
    const farm = await this.farmsRepository.getFarmByUserId(userId)

    if(!farm) {
      return left(new FarmNotFoundError())
    }


    return right(farm)
  }
}
