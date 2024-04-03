import { User } from '../domain/user'

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>
  findByEmailOrUsername(identifier: string): Promise<User | null>
  existsByEmail(email: string): Promise<boolean>
  existsByUsername(username: string): Promise<boolean>
  findById(id: string): Promise<User | null>
  create(user: User): Promise<void>
  update(user: User): Promise<void>
}
