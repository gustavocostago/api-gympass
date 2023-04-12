import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AutheticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AutheticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AutheticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    const userCreate = {
      name: 'josé',
      email: 'joao@mail.com',
      password_hash: await hash('123456', 6),
    }
    await usersRepository.create(userCreate)

    const { user } = await sut.execute({
      email: 'joao@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(async () => {
      await sut.execute({
        email: 'joao@mail.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const userCreate = {
      name: 'josé',
      email: 'joao@mail.com',
      password_hash: await hash('123456', 6),
    }
    await usersRepository.create(userCreate)

    expect(async () => {
      await sut.execute({
        email: 'joao@mail.com',
        password: '123455',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
