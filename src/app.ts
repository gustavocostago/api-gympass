import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify({
  logger: false,
})

app.register(appRoutes)
