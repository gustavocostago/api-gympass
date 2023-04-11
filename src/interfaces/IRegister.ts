import { Prisma, User } from '@prisma/client'

export interface IRegister {
  name: string
  email: string
  password: string
}
export interface usersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
}
