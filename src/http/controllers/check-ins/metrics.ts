import { makeGetUserMetricsService } from '@/services/factories/make-user-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserCheckInHistoryService = makeGetUserMetricsService()

  const { checkInsCount } = await fetchUserCheckInHistoryService.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
