import type { Timestamps } from "../domain/entity"
import { isUndefined } from "../infra/is-undefined"

type PrismaTimestamps = {
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}


export class EntityMapper {


    static toTimestamps(item: PrismaTimestamps): Timestamps {
        return {
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            deletedAt: isUndefined( item.deleted_at)
    }
}
}