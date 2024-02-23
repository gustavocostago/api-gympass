import apm from 'elastic-apm-node/start'
apm

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
import { metricsRoutes } from './http/controllers/metrics/routes'
import promClient from 'prom-client'

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
app.register(metricsRoutes)

const collectDefaultMetrics = promClient.collectDefaultMetrics
const Registry = promClient.Registry
export const register = new Registry()
collectDefaultMetrics({ register })

export const httpRequestTimer = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  // buckets for response time from 0.1ms to 1s
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000],
})
register.registerMetric(httpRequestTimer)

app.setErrorHandler((error, _request, reply) => {
  apm.captureError(error)
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
