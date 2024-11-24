import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { context } from './context'
import { createServer } from 'node:http'
import { useCookies } from '@whatwg-node/server-plugin-cookies'

const yoga = createYoga({
  schema,
  context,
  cors: {
    origin:
      process.env.NODE_ENV === 'development'
        ? ['http://localhost:3000', 'http://localhost:4000', 'https://playpulse.co']
        : ['https://playpulse.co'],
    credentials: true,
  },
  logging: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  plugins: [useCookies()],
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
