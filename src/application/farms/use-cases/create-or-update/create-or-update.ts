import { Farm } from '../../domain/farm'
import { Either, left, right } from '@/core/logic/either'
import { FarmProps, Roles } from '../../domain/farm.schema'
import { IFarmsRepository } from '../../repositories/IFarmsRepository'

export type CreateOrUpdateFarmRequest = FarmProps & {
  _id?: string
  userId: string
}

type CreateOrUpdateFarmResponse = Either<Error, Farm>

export class CreateOrUpdateFarm {
  constructor(private readonly farmsRepository: IFarmsRepository) {}

  async execute({
    name,
    _id,
    userId
  }: CreateOrUpdateFarmRequest): Promise<CreateOrUpdateFarmResponse> {
    let farmExists: Farm | null = null

    if (_id) {
      farmExists = await this.farmsRepository.findById(_id)
    }

    const farmOrError = Farm.create(
      {
        name
      },
      _id
    )

    if (farmOrError.isLeft()) {
      return left(farmOrError.value)
    }

    const farm = farmOrError.value
    await this.farmsRepository.createOrUpdate(farm)
    await this.farmsRepository.addMember(userId, farm.id, Roles.OWNER)
    return right(farm)
  }
}
