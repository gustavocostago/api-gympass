import { register } from '@/app'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function send(request: FastifyRequest, reply: FastifyReply) {
  reply.header('Content-Type', register.contentType)
  reply.send(await register.metrics())
}
