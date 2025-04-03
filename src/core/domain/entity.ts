import { Generate } from '../logic/generate'

export type Timestamps = {
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export type PartialIncludes<T extends object> = {
  [P in keyof T]?: boolean
}

export type ControllerIncludes<T extends object> = {
  [P in keyof T]?: string
}

export type Relations = Record<string, Entity<any>>

// biome-ignore lint/complexity/noBannedTypes: @TODO
export type ToResponseBody<T, U extends Relations = {}> = T &
  Timestamps &
  U & {
    _id: string
  }

export class Entity<T> {
  protected readonly _id: string
  public readonly props: T
  public readonly timestamps?: Timestamps

  constructor(props: T, id?: string, timestamps?: Timestamps) {
    this._id = id || Generate.id()
    this.props = props
    this.timestamps = timestamps
  }

  get id() {
    return this._id
  }

  public equals(object?: Entity<T> | null): boolean {
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
      ...this.props
    }
  }

  public toResponseBody(): ToResponseBody<T> {
    return {
      _id: this._id,
      ...this.props,
      ...this.timestamps
    }
  }

  public composeRelations(relations: Relations) {
    const relationKeys = Object.keys(relations)
    const relationsDto: Record<string, object> = {}

    return relationKeys.map((key) => {
      relationsDto[key] = relations[key].toResponseBody()
    })
  }
}
