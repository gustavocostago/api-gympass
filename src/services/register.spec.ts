import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

describe('Register services', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const { user } = await registerUseCase.add({
      name: 'josé',
      email: 'jose@mail.com',
      password: '123456',
    })
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
