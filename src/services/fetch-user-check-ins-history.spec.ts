import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryCase

describe('Fetch check-in History Services', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryCase(checkInsRepository)
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
    const { checkIns } = await sut.execute({
      userId: 'user-03',
      page: 1,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '001' }),
      expect.objectContaining({ gym_id: '002' }),
    ])
  })
  it('should be able to fetch paginated  check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })
    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
