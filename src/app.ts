import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from 'env'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const app = fastify({
  logger: false,
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Api Gym Pass',
      version: 'v1',
      description: 'Documentação sobre as endpoints do back-end',
    },
  },
})
app.register(fastifySwaggerUi, {
  prefix: '/v1/docs',
})
app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
