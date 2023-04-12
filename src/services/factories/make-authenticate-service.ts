import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AutheticateUseCase } from '../authenticate'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUserRepository()
  const authenticateService = new AutheticateUseCase(usersRepository)
  return authenticateService
}
