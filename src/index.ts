import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { context } from './context'
import express from 'express'
import cookieParser from 'cookie-parser'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import { costLimitPlugin } from '@escape.tech/graphql-armor-cost-limit'
import { maxAliasesPlugin } from '@escape.tech/graphql-armor-max-aliases'
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth'
import { maxDirectivesPlugin } from '@escape.tech/graphql-armor-max-directives'
import { maxTokensPlugin } from '@escape.tech/graphql-armor-max-tokens'
import { Request, Response, NextFunction } from 'express'
import { YogaExpressContextWithAuth } from './types/pulse'

const app = express()

app.use(clerkMiddleware())
app.use(cookieParser())

const yoga = createYoga({
  schema,
  context: (req) => ({
    ...context,
    auth: (req as YogaExpressContextWithAuth).req.auth,
  }),
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
    maxDepthPlugin({ n: 10 }),
    maxDirectivesPlugin(),
    maxAliasesPlugin(),
  ],
})

app.use(yoga.graphqlEndpoint, requireAuth(), yoga)

app.use('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

//error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.info(
    `Server is running on ${process.env.NODE_ENV === 'development' ? 'http://localhost:' : 'https://api.playpulse.co'}${
      process.env.PORT || 4000
    }/graphql`
  )
})
