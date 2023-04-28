import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUserRepository()
  const getUserProfileService = new GetUserProfileUseCase(usersRepository)
  return getUserProfileService
}
