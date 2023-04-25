import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym services', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })
  it('should be able to create a gym', async () => {
    const { gym } = await sut.add({
      title: 'GGWP',
      description: 'maohe',
      phone: '4002 8922',
      latitude: -202012.3333,
      longitude: -20320012.222,
    })
    expect(gym.id).toEqual(expect.any(String))
  })
})
