import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsCase

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsCase(checkInsRepository)
  })
  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      user_id: 'user-03',
      gym_id: '001',
    })
    await checkInsRepository.create({
      user_id: 'user-03',
      gym_id: '002',
    })
    const { checkInsCount } = await sut.execute({
      userId: 'user-03',
    })
    expect(checkInsCount).toEqual(2)
  })
})
