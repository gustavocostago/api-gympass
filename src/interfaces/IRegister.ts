import { User } from '@prisma/client'

export interface IRegister {
  name: string
  email: string
  password: string
}

export interface IRegisterResponse {
  user: User
}
