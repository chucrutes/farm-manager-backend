export class RelationEntity<T> {
  public readonly props: T

  constructor(props: T) {
    this.props = props
  }

  public equals(object?: RelationEntity<T> | null): boolean {
    if (!object || object == null || object === undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    return false
  }

  public toResponseBody() {
    return {
      ...this.props
    }
  }
}
