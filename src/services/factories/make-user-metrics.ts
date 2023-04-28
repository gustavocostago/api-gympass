import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { GetUserMetricsCase } from '../get-user-metrics'

export function makeGetUserMetricsService() {
  const checkInRepository = new PrismaCheckInsRepository()
  const getUserMetricsService = new GetUserMetricsCase(checkInRepository)
  return getUserMetricsService
}
