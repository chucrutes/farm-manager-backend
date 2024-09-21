import { CreateEntry, CreateEntryRequest } from './create-entry'
import { UserFactory } from '@/tests/factories/UserFactory'
import { beforeAll, describe, expect, test } from 'vitest'
import { IEntriesRepository } from '../../repositories/IEntriesRepository'
import { IUsersRepository } from '@/application/users/repositories/IUsersRepository'
import { InMemoryEntriesRepository } from '../../repositories/in-memory/InMemoryEntriesRepository'
import { InMemoryUsersRepository } from '@/application/users/repositories/in-memory/InMemoryUsersRepository'
import { EntryFactory } from '@/tests/factories/EntryFactory'

let usersRepository: IUsersRepository
let entriesRepository: IEntriesRepository
let createEntry: CreateEntry

type Request = CreateEntryRequest

describe('Create an user', () => {
  const user = UserFactory.create()
  const { id, props } = EntryFactory.create({ userId: user.id })

  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    entriesRepository = new InMemoryEntriesRepository()
    createEntry = new CreateEntry(entriesRepository)
  })

  test('should create an entry', async () => {
    const data: Request = {
      userId: user.id,
      ...props,
    }

    const response = await createEntry.execute(data)
    expect(response.isRight()).toBeTruthy()
  })
})
