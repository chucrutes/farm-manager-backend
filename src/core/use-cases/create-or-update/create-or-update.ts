import type { Entity } from '@/core/domain/entity'
import { type Either, left, right } from '@/core/logic/either'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'

export class CreateOrUpdateEntity<
  T extends Entity<any, any>,
  R extends ICrudRepository<T, R>
> {
  constructor(private readonly repository: R) {}

  async execute({
    attributes,
    _id,
    userId
  }: {
    attributes: T
    _id?: string
    userId: string
  }): Promise<Either<Error, T>> {
    let entityExists: T | null = null

    if (_id) {
      entityExists = await this.repository.findById(_id)
    }

    // Dynamically create or update the entity using the provided attributes
    const entityOrError = T.create({ attributes }, _id)

    if (entityOrError.isLeft()) {
      return left(entityOrError.value)
    }

    const entity = entityOrError.value

    await this.repository.createOrUpdate(entity)
    return right(entity)
  }
}
