import { Generate } from '../logic/generate'

type Timestamps = {
  createdAt?: Date
  updatedAt?: Date
  deleteddAt?: Date
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

  public toResponseBody() {
    return {
      _id: this._id,
      ...this.props,
      ...this.timestamps
    }
  }
}
