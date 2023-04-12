import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post(
    '/users',
    {
      schema: {
        description: 'Realiza a criação de usuário',
        tags: ['Usuários'],
        params: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome de usuário',
            },
            email: {
              type: 'string',
              description: 'E-mail válido',
            },
            password: {
              type: 'string',
              description: 'Senha com no mínimo 6 caracters',
            },
          },
        },
        body: {
          type: 'object',
          properties: {
            hello: { type: 'string' },
            obj: {
              type: 'object',
              properties: {
                some: { type: 'string' },
              },
            },
          },
        },
        response: {
          201: {
            description: 'Successful response',
            type: 'object',
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    register
  )
}
