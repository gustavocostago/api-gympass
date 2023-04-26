import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymService(gymsRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'PERTO',
      description: 'maohe',
      phone: '4002 8922',
      latitude: -202012.3333,
      longitude: -20320012.222,
    })
    await gymsRepository.create({
      title: 'LONGE',
      description: 'maohe',
      phone: '4002 8922',
      latitude: -2333332.3333,
      longitude: -2222212.222,
    })
    const { gyms } = await sut.add({
      userLatitude: -202012.3333,
      userLongitude: -20320012.222,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'PERTO' })])
  })
})
