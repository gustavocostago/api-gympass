import { makeFetchUserCheckInsHistoryService } from '@/services/factories/make-fetch-user-check-ins-history-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserCheckInHistoryBodySchema = z.object({
    page: z.number().min(1).default(1),
  })
  const { page } = fetchUserCheckInHistoryBodySchema.parse(request.query)

  const fetchUserCheckInHistoryService = makeFetchUserCheckInsHistoryService()

  const { checkIns } = await fetchUserCheckInHistoryService.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send({
    checkIns,
  })
}
