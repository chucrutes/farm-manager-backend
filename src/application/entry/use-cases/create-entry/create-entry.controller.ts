import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  conflict,
  created
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateEntry, CreateEntryRequest } from './create-entry'

type CreateEntryControllerRequest = Omit<CreateEntryRequest, 'userId'> & {
  currentUserId: string
}

export class CreateEntryController implements Controller {
  constructor(
    private readonly validator: Validator<CreateEntryControllerRequest>,
    private createEntry: CreateEntry
  ) {}

  async handle(request: CreateEntryControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createEntry.execute({
      userId: request.currentUserId,
      ...request
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          return clientError(error)
      }
    }
    return created({ message: t('entry.created') })
  }
}
