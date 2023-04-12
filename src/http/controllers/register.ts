import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exits-error'
import { RegisterService } from '@/services/register'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUserRepository()
    const registerService = new RegisterService(usersRepository)

    await registerService.add({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ messsage: err.message })
    }
    throw err
  }
  return reply.status(201).send()
}
