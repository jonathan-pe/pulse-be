import { createYoga, YogaInitialContext } from 'graphql-yoga'
import { schema } from './schema'
import { context } from './context'
import express from 'express'
import cookieParser from 'cookie-parser'
import { clerkMiddleware } from '@clerk/express'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import { costLimitPlugin } from '@escape.tech/graphql-armor-cost-limit'
import { maxAliasesPlugin } from '@escape.tech/graphql-armor-max-aliases'
import { maxDepthPlugin } from '@escape.tech/graphql-armor-max-depth'
import { maxDirectivesPlugin } from '@escape.tech/graphql-armor-max-directives'
import { maxTokensPlugin } from '@escape.tech/graphql-armor-max-tokens'
import { Request, Response, NextFunction } from 'express'
import cors from 'cors'

import requireAuth from './utils/requireAuth'

const DEV_ALLOWED_ORIGINS = ['https://playpulse.co', 'http://localhost:5173', 'http://localhost:4000']
const PROD_ALLOWED_ORIGINS = ['https://playpulse.co']

const app = express()

// Adds `auth` to the context
app.use(
  clerkMiddleware({
    authorizedParties: process.env.NODE_ENV === 'development' ? DEV_ALLOWED_ORIGINS : PROD_ALLOWED_ORIGINS,
  })
)
app.use(cookieParser())

// CORS wasn't working with createYoga so we're using express middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === 'development' ? DEV_ALLOWED_ORIGINS : PROD_ALLOWED_ORIGINS,
    credentials: true,
  })
)

const yoga = createYoga({
  schema,
  context: (request) => {
    const req = (request as YogaInitialContext & { req: Request }).req

    /* Currently covers all resolvers, maybe need to abstract out if we want some public endpoints
    but I'm currently not seeing any use cases where we should open up these endpoints to the public */
    requireAuth(req)

    return context
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

app.use(yoga.graphqlEndpoint, yoga)

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
