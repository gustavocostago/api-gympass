import { IRegister, usersRepository } from '@/interfaces/IRegister'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export class RegisterService {
  constructor(private usersRepository: usersRepository) {}
  async add({ name, email, password }: IRegister) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
