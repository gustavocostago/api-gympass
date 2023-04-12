import {
  IRegister,
  IRegisterResponse,
  UsersRepository,
} from '@/interfaces/IRegister'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exits-error'

export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async add({ name, email, password }: IRegister): Promise<IRegisterResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
