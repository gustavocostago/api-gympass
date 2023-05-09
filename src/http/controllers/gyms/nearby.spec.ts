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
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Jump',
        description: null,
        phone: null,
        latitude: -15.6142378,
        longitude: -56.0851705,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Jacarezinho',
        description: null,
        phone: null,
        latitude: -15.6147904,
        longitude: -56.0602985,
      })
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Rafitness',
        description: null,
        phone: null,
        latitude: -15.6623063,
        longitude: -56.0482787,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -15.6337389,
        longitude: -55.9884282,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Jacarezinho',
      }),
      expect.objectContaining({
        title: 'Rafitness',
      }),
    ])
  })
})
