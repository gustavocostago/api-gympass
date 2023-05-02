import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'

import { env } from 'env'
import { ZodError } from 'zod'

import { usersRoutes } from './http/controllers/users/routes'
import { gymRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'

export const app = fastify({
  logger: false,
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)
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
app.register(usersRoutes)
app.register(gymRoutes)
app.register(checkInsRoutes)

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
