import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymService

describe('Search Gyms Services', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymService(gymsRepository)
  })
  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'smartfit',
      description: 'maohe',
      phone: '4002 8922',
      latitude: -202012.3333,
      longitude: -20320012.222,
    })
    await gymsRepository.create({
      title: 'jacarezinho',
      description: 'maohe',
      phone: '4002 8922',
      latitude: -202012.3333,
      longitude: -20320012.222,
    })
    const { gyms } = await sut.search({
      query: 'jacarezinho',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'jacarezinho' })])
  })
  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `jacarezinho-${i}`,
        description: 'maohe',
        phone: '4002 8922',
        latitude: -202012.3333,
        longitude: -20320012.222,
      })
    }
    const { gyms } = await sut.search({
      query: 'jacarezinho',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'jacarezinho-21' }),
      expect.objectContaining({ title: 'jacarezinho-22' }),
    ])
  })
})
