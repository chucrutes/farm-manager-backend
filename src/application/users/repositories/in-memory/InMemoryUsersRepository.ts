import { User } from '../../domain/user'
import { IUsersRepository } from '../IUsersRepository'

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(public users: User[] = []) {}

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async update(workspace: User): Promise<void> {
    const index = this.users.findIndex(
      (userItem) => userItem.id === workspace.id
    )

    this.users[index] = workspace
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.props.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const user = this.users.find(
      (user) =>
        user.props.email === identifier || user.props.username === identifier
    )

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) return null

    return user
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.props.email === email)
    return !!user
  }

  async existsByUsername(username: string): Promise<boolean> {
    const user = this.users.some((user) => user.props.username === username)
    return !!user
  }
}
