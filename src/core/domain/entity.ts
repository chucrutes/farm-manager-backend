import type { z } from 'zod'
import { Generate } from '../logic/generate'
import { ZodValidationError } from './errors/ZodValidationError'
import { type Either, left, right } from '../logic/either'

type Timestamps = {
  createdAt?: Date
  updatedAt?: Date
  deleteddAt?: Date
}

export type ZodObject = z.AnyZodObject

export type PartialIncludes<T extends object> = {
  [P in keyof T]?: boolean
}

export type ConstructorProps<Attributes, Relations> = {
  schema: ZodObject
  attributes: Attributes
  id?: string
  timestamps?: Timestamps
  relations?: Relations
}

export class Entity<Attributes extends object, Relations> {
  protected readonly _id: string
  public readonly attributes: Attributes
  public readonly timestamps?: Timestamps
  public readonly relations?: Relations

  constructor(props: ConstructorProps<Attributes, Relations>) {
    this._id = props.id || Generate.id()
    this.attributes = props.attributes
    this.timestamps = props.timestamps
    this.relations = props.relations
  }

  static create<Attributes extends object, Relations>(
    props: ConstructorProps<Attributes, Relations>
  ): Either<Error, Entity<Attributes, Relations>> {
    const result = props.schema.safeParse(props.attributes)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Entity(props))
  }

  get id() {
    return this._id
  }

  public equals(object?: Entity<Attributes, Relations> | null): boolean {
    if (!object || object == null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    return this.id === object.id
  }

  public createVersion(versionNumber: number) {
    return {
      id: Generate.id(),
      versionNumber,
      entityId: this._id,
      ...this.attributes
    }
  }

  public toResponseBody() {
    return {
      _id: this._id,
      ...this.attributes,
      ...this.timestamps
    }
  }
}
