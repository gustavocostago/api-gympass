import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search a nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Jump',
        description: 'dasda',
        phone: '659819999590',
        latitude: -15.5947807,
        longitude: -56.0638225,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jacarezinho',
        description: 'dasda',
        phone: '659819999590',
        latitude: -15.5947807,
        longitude: -56.0638225,
      })
    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'New Jump',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'New Jump',
      }),
    ])
  })
})
