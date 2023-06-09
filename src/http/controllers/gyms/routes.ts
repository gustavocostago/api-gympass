import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { verifyJWT } from '../middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '../middlewares/verify-user-role'

export async function gymRoutes(app: FastifyInstance) {
  async function hello(req: FastifyRequest, res: FastifyReply) {
    res.status(200).send('hello')
  }
  app.get('/', hello)
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create)
}
