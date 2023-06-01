import { env } from '../env'
import { app } from './app'
import { client } from './lib/redis'

client.connect()
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('\n<---------SERVIDOR-ONLINE--------->\n')
  })
