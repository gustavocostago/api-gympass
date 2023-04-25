import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  // async create(data: Prisma.GymCreateInput): Promise<Gym> {
  //   const gym = {
  //     id: randomUUID(),
  //     title: data.title,
  //     description: data.description ? data.description : null,
  //     latitude: new Decimal(0),
  //     longitude: new Decimal(0),
  //     phone: data.phone ? data.phone : null,
  //   }
  //   this.items.push(gym)
  //   return gym
  // }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }
}
