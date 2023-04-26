import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInService } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found'

let checkInsRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

describe('Validate Check-in Services', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInService(checkInsRepository)

    // vi.useFakeTimers()
  })
  afterEach(() => {
    // vi.useRealTimers
  })
  it('should be able to validate the check in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'valid_gym',
      user_id: 'valid_user',
    })
    const { checkIn } = await sut.execute({ checkInId: createdCheckIn.id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('should not be able to validate an inexistent check in', async () => {
    expect(async () => {
      await sut.execute({ checkInId: 'inexistent' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
