import { z } from 'zod'
import { IUsersRepository } from '../../repositories/IUsersRepository'

const UserDetails = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  username: z.string().nullish(),
  workspaces: z.array(
    z.object({
      _id: z.string(),
      roles: z.array(z.string())
    })
  ),
  projects: z.array(
    z.object({
      _id: z.string(),
      roles: z.array(z.string())
    })
  )
})

export type UserDetails = z.infer<typeof UserDetails>

export class GetUserDetails {
  constructor(private readonly usersRepository: IUsersRepository) {}

  async execute(userId: string): Promise<UserDetails> {
    const user = await this.usersRepository.findMe(userId)

    if (!user) {
      throw new Error('User not found') // TODO: Create a custom error
    }

    return UserDetails.parse({ ...user })
  }
}
