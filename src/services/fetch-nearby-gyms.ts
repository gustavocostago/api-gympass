import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export interface FetchNearbyGymRequest {
  userLatitude: number
  userLongitude: number
}

export interface FetchNearbyGymResponse {
  gyms: Gym[]
}

export class FetchNearbyGymService {
  constructor(private gymRepository: GymsRepository) {}

  async add({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymRequest): Promise<FetchNearbyGymResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    return {
      gyms,
    }
  }
}
