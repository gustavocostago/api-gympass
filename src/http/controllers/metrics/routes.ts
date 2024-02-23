import { FastifyInstance } from 'fastify'
import { send } from './send'

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/metrics', send)
}
