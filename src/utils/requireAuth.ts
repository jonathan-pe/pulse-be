import { getAuth } from '@clerk/express'
import { Request } from 'express'
import { GraphQLError } from 'graphql'

const requireAuth = (req: Request) => {
  const auth = getAuth(req)

  if (!auth || !auth.userId) {
    throw new GraphQLError('Unauthorized', {
      extensions: {
        code: 'Unauthorized',
        http: {
          status: 401,
        },
      },
    })
  }
}

export default requireAuth
