import { Entry } from '../../domain/entry'
import { prismaClient } from '@/infra/prisma/client'
import { EntryMapper } from '../../mappers/entry-mapper'
import { IEntriesRepository } from '../IEntriesRepository'

export class PrismEntriesRepository implements IEntriesRepository {
  async create(entry: Entry): Promise<void> {
    const data = await EntryMapper.toPersistence(entry)

    await prismaClient.entry.create({
      data
    })
  }
}
