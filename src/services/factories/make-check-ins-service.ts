import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckInService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkInService = new CheckInUseCase(checkInRepository, gymsRepository)
  return checkInService
}
