import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { context } from './context'
import { createServer } from 'node:http'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import { costLimitPlugin } from '@escape.tech/graphql-armor-cost-limit'
import { maxAliasesPlugin } from '@escape.tech/graphql-armor-max-aliases'
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth'
import { maxDirectivesPlugin } from '@escape.tech/graphql-armor-max-directives'
import { maxTokensPlugin } from '@escape.tech/graphql-armor-max-tokens'

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
  plugins: [
    useCookies(),
    costLimitPlugin(),
    maxTokensPlugin(),
    maxDepthPlugin(),
    maxDirectivesPlugin(),
    maxAliasesPlugin(),
  ],
})

const server = createServer((req, res) => {
  if (req.url === '/healthz' && req.method === 'GET') {
    // Health check endpoint
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok' }))
  } else {
    // Pass other requests to Yoga
    yoga.handle(req, res)
  }
})

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})
