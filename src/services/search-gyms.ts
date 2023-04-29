import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

export interface ISearchGymRequest {
  query: string
  page: number
}

export interface ISearchGymResponse {
  gyms: Gym[]
}

export class SearchGymService {
  constructor(private gymRepository: GymsRepository) {}

  async search({
    query,
    page,
  }: ISearchGymRequest): Promise<ISearchGymResponse> {
    const gyms = await this.gymRepository.searchMany(query, page)
    return {
      gyms,
    }
  }
}
