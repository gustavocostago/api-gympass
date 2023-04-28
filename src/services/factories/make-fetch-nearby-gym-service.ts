import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymService } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymService = new FetchNearbyGymService(gymsRepository)
  return fetchNearbyGymService
}
