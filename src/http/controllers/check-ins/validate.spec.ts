import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gym = await prisma.gym.create({
      data: {
        title: 'new jump',
        latitude: -15.6623063,
        longitude: -56.0482787,
      },
    })

    const createCheckInResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.6623063,
        longitude: -56.0482787,
      })
    const response = await request(app.server)
      .patch(`/check-ins/${createCheckInResponse.body.id}/validate`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(204)
  })
})
