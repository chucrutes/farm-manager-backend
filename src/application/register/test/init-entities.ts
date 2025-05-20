import { EntryFactory } from '@/application/entries/test/entry.factory'
import { Categories } from '@/application/entry-type/domain/entry-type.schema'
import { EntryTypeFactory } from '@/application/entry-type/test/entry-types.factory'
import { FarmFactory } from '@/application/farms/test/farm.factory'
import { UserFactory } from '@/tests/factories/UserFactory'
import { RegisterFactory } from './register.factory'

export const initEntities = () => {
  const userWithJwt = UserFactory.createAndAuthenticate()
  const farm = FarmFactory.create()
  const register = RegisterFactory.create({})
  const entryTypes = EntryTypeFactory.createMany(
    [
      { category: Categories.INCOME },
      { category: Categories.INCOME },
      { category: Categories.EXPENSE },
      { category: Categories.EXPENSE },
      { category: Categories.EXPENSE }
    ],
    {
      farm: farm
    }
  )
  // const entries = [
  //   EntryFactory.create({}, { type: entryTypes[0], register, farm }),
  //   EntryFactory.create({}, { type: entryTypes[1], register, farm }),
  //   EntryFactory.create({}, { type: entryTypes[3], register, farm })
  // ]

  return { userWithJwt, farm, entryTypes, register }
}

export const ROUTE_ENTITY = '/api/entry-types'
