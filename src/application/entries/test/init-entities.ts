import { EntryFactory } from './entry.factory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { FarmFactory } from '@/application/farms/test/farm.factory'
import { EntryTypeFactory } from '@/application/entry-type/test/entry-types.factory'
import { Categories } from '@/application/entry-type/domain/entry-type.schema'

export const initEntities = () => {
  const userWithJwt = UserFactory.createAndAuthenticate()
  const farm = FarmFactory.create()
  const type = EntryTypeFactory.create({}, { farm })
  const expense = EntryTypeFactory.create(
    { category: Categories.EXPENSE, commission: true },
    { farm }
  )
  const entry = EntryFactory.create({}, { farm, type: type })
  const manyEntries = EntryFactory.createMany([{}, {}, {}], { farm, type })

  return { userWithJwt, farm, type, expense, manyEntries, entry }
}

export const ROUTE_ENTITY = '/api/entries'
