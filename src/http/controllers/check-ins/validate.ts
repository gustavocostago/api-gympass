import { makeValidateCheckInService } from '@/services/factories/make-validate-check-in-service'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })
  const { checkInId } = createCheckInParamsSchema.parse(request.params)
  const fetchUserCheckInHistoryService = makeValidateCheckInService()

  await fetchUserCheckInHistoryService.execute({
    checkInId,
  })

  return reply.status(204).send()
}
