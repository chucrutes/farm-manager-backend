import { HttpResponse, ok } from '@/core/infra/http-response'
import { UserDoesNotExistError } from '../forgot-password/errors/UserDoesNotExistError'
import { GetUserDetails, UserDetails } from './user-details'

type GetUserDetailsControllerRequest = UserDetails & {
  currentUserId: string
}

export class GetUserDetailsController {
  constructor(private readonly createUser: GetUserDetails) {}

  async handle(
    request: GetUserDetailsControllerRequest
  ): Promise<HttpResponse> {
    const { currentUserId } = request

    if (!currentUserId) {
      throw new UserDoesNotExistError()
    }

    const user = await this.createUser.execute(currentUserId)
    return ok({ dto: user })
  }
}
