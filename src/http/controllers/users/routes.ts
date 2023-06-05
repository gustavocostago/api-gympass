import { FastifyInstance, FastifyReply } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/controllers/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance, reply: FastifyReply) {
  app.get('/', () => {
    reply.status(200).send({ message: 'teste' })
  })
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile
  )
}
