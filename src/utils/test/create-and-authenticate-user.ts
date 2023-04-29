import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'valid_name',
    email: 'valid_mail@mail.com',
    password: 'valid_password',
  })
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'valid_mail@mail.com',
    password: 'valid_password',
  })
  const { token } = authResponse.body
  return {
    token,
  }
}
