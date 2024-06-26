import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/services/errors/user-already-exits-error'
import { makeRegisterUseCase } from '@/services/factories/make-register-service'
import { httpRequestTimer } from '@/app'
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const start = Date.now()
  const { name, email, password } = registerBodySchema.parse(request.body)
  try {
    const registerService = makeRegisterUseCase()

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
  } finally {
    const responseTimeInMs = Date.now() - start
    httpRequestTimer
      .labels(
        request.routerMethod,
        request.routerPath,
        reply.statusCode.toString()
      )
      .observe(responseTimeInMs)
  }

  return reply.status(201).send()
}
