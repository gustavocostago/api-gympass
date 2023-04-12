import { expect, describe, it } from 'vitest'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exits-error'

describe('Register services', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const { user } = await registerUseCase.add({
      name: 'josé',
      email: 'jose@mail.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
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
  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterService(usersRepository)

    const user = {
      name: 'josé',
      email: 'joao@mail.com',
      password: '123456',
    }
    await registerUseCase.add(user)

    expect(async () => {
      await registerUseCase.add(user)
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
