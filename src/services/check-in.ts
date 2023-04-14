import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}
interface CheckInCaseResponse {
  checkIn: CheckIn
}
export class AutheticateUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })
    return {
      checkIn,
    }
  }
}
