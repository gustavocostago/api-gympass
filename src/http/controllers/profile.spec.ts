import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profiel (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'valid_mail@mail.com',
      password: 'valid_password',
    })
    const { token } = authResponse.body
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })
})
