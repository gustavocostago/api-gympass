import { CheckInRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsCaseRequest {
  userId: string
}
interface GetUserMetricsResponse {
  checkInsCount: number
}
export class GetUserMetricsCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsCaseRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount,
    }
  }
}
