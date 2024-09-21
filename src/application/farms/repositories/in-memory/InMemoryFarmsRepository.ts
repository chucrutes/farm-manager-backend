import { Farm } from '../../domain/farm'
import { Roles } from '../../domain/farm.schema'
import { IFarmsRepository } from '../IFarmsRepository'

export class InMemoryFarmsRepository implements IFarmsRepository {
  constructor(public farms: Farm[] = []) {}
  getFarmByUserId(userId: string): Promise<Farm | null> {
    throw new Error('Method not implemented.')
  }
  async createOrUpdate(entity: Farm): Promise<void> {
    const entityFound = await this.findById(entity.id)

    if (entityFound) {
      await this.update(entity)
      return
    }

    await this.create(entity)
  }

  async create(farm: Farm): Promise<void> {
    this.farms.push(farm)
  }
  async update(workspace: Farm): Promise<void> {
    const index = this.farms.findIndex(
      (farmItem) => farmItem.id === workspace.id
    )

    this.farms[index] = workspace
  }
  async findById(id: string): Promise<Farm | null> {
    const farm = this.farms.find((farm) => farm.id === id)

    if (!farm) return null

    return farm
  }
  async deleteMany(_ids: string[]): Promise<void> {}
  async addMember(
    _userId: string,
    _farmId: string,
    _role: Roles
  ): Promise<void> {}
}
