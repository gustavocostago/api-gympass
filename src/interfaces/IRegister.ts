import { Prisma, User } from '@prisma/client'

export interface IRegister {
  name: string
  email: string
  password: string
}
export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
