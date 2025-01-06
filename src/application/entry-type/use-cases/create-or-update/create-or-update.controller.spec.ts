import { Roles } from "@/application/farms/domain/farm.schema";
import { IFarmsRepository } from "@/application/farms/repositories/IFarmsRepository";
import PrismaFarmsRepository from "@/application/farms/repositories/prisma/PrismaFarmsRepository";
import { IUsersRepository } from "@/application/users/repositories/IUsersRepository";
import { PrismaUsersRepository } from "@/application/users/repositories/prisma/PrismaUsersRepository";
import { beforeAll, describe, test } from "vitest";
import { initEntities, ROUTE_ENTITY } from "../../test/init-entities";
import { app } from '@/infra/http/app'
import request from 'supertest'
import { EntryTypeFactory } from "../../test/entry-types.factory";
import { CreateOrUpdateEntryTypeControllerRequest } from "./create-or-update.controller";
import { IEntryTypesRepository } from "../../repositories/IEntryTypesRepository";
import PrismaEntryTypesRepository from "../../repositories/prisma/PrismaEntryTypesRepository";
import { stringifier } from "@/core/stringifier";

let usersRepository: IUsersRepository
let farmsRepository: IFarmsRepository
let entryTypesRepository: IEntryTypesRepository

type Request = Omit<CreateOrUpdateEntryTypeControllerRequest, 'requesterId'>

describe('Create or update entry type(E2E)', async () => {
    const { farm, userWithJwt: { user, jwt } } = initEntities()

    beforeAll(async () => {
        usersRepository = new PrismaUsersRepository()
        farmsRepository = new PrismaFarmsRepository()
        entryTypesRepository = new PrismaEntryTypesRepository()

        await usersRepository.create(user)
        await farmsRepository.createOrUpdate(farm)
        await farmsRepository.addMember(user.id, farm.id, Roles.OWNER)
    })

    test('should create a type', async () => {

        const entryType = EntryTypeFactory.create()

        const data: Request = entryType.props


        const response = await request(app)
            .post(ROUTE_ENTITY)
            .auth(jwt.token, { type: 'bearer' })
            .send(data)



        stringifier(response.body)

    })
})