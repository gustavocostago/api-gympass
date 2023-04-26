import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}
export class FetchUserCheckInsHistoryCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryCaseRequest): Promise<FetchUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    )

    return {
      checkIns,
    }
  }
}
