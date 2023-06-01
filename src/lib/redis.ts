import { env } from 'env'
import { createClient } from 'redis'
export const client = createClient({
  url: env.URL_CONNECTION_REDIS,
})
client.on('error', (err) => console.log('Redis Client Error', err))
