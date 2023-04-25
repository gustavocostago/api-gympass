import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export interface ICreateGym {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface ICreateGymResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymRepository: GymsRepository) {}

  async add({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: ICreateGym): Promise<ICreateGymResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
