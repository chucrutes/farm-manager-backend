import { Entity, type ZodObject } from '@/core/domain/entity'
import { type Either, left, right } from '@/core/logic/either'
import type { ICrudRepository } from '@/core/domain/ICrudRepository'

export class CreateOrUpdateEntity<
  R extends object,
  T extends ICrudRepository<Entity<object, unknown>, R>
> {
  constructor(
    private readonly repository: T,
    private readonly schema: ZodObject
  ) {}

  async execute({
    attributes,
    _id
  }: {
    attributes: object
    _id?: string
    userId: string
  }): Promise<Either<Error, Entity<object, unknown>>> {
    let entityExists: Entity<object, unknown> | null = null

    if (_id) {
      entityExists = await this.repository.findById(_id)
    }

    const entityOrError = Entity.create({
      attributes,
      id: _id,
      schema: this.schema
    })

    if (entityOrError.isLeft()) {
      return left(entityOrError.value)
    }

    const entity = entityOrError.value

    await this.repository.createOrUpdate(entity)

    return right(entity)
  }
}
