import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const app = fastify({
  logger: false,
})

app.get('/', async () => {
  return 'hello'
})
