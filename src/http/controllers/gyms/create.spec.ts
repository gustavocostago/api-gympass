import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const createResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'GG',
        description: 'dasda',
        phone: '659819999590',
        latitude: -15.5947807,
        longitude: -56.0638225,
      })
    expect(createResponse.statusCode).toEqual(201)
  })
})
