import { FastifyReply, FastifyRequest } from 'fastify'
import { client } from '@/lib/redis'

import { makeGetUserProfileService } from '@/services/factories/make-get-user-profile-service'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService()
  const insertRedis = await client.get('User')
  if (insertRedis) {
    return reply.status(200).send(JSON.parse(insertRedis))
  }
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })
  const data = {
    ...user,
    password_hash: undefined,
  }
  await client.set('User', JSON.stringify(data), { EX: 1000 })
  return reply.status(200).send(data)
}
