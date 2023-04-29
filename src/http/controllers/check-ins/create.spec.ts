import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-In (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Jump',
        description: 'academiaa',
        phone: '659819999590',
        latitude: -15.5947807,
        longitude: -56.0638225,
      })

    // console.log(gymResponse.body)
    const createCheckInResponse = await request(app.server)
      .post(`/gyms/${gymResponse.body.gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.5947807,
        longitude: -56.0638225,
      })
    // console.log(createCheckInResponse.body.issues)
    expect(createCheckInResponse.statusCode).toEqual(201)
  })
})
