import { Entity } from '@/core/domain/entity'
import { EntryProps, EntrySchema } from './entry.schema'
import { Either, left, right } from '@/core/logic/either'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'

export class Entry extends Entity<EntryProps> {
  private constructor(props: EntryProps, id?: string) {
    super(props, id)
  }

  static create(props: EntryProps, id?: string): Either<Error, Entry> {
    const result = EntrySchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Entry(result.data, id))
  }
}
