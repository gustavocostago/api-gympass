import { Prisma, User } from '@prisma/client'

export interface IRegister {
  name: string
  email: string
  password: string
}

export interface IRegisterResponse {
  user: User
}

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
