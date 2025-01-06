import { FarmFactory } from "@/application/farms/test/farm.factory"
import { UserFactory } from "@/tests/factories/UserFactory"
import { EntryTypeFactory } from "./entry-types.factory"

export const initEntities = () => {
    const userWithJwt = UserFactory.createAndAuthenticate()
    const farm = FarmFactory.create()
    const entryType = EntryTypeFactory.create({}, {farm})

    return { userWithJwt, farm, entryType }
}

export const ROUTE_ENTITY = '/api/entry-types'