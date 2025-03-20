import { getAuth } from '@clerk/express'
import { Request } from 'express'
import { GraphQLError } from 'graphql'
import { prisma } from '../context'

const requireAuth = async (req: Request) => {
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

  // TODO: Eventually we'll want to hook up to Webhooks to create userStats
  // upon Clerk event of user creation
  const userStats = await prisma.userStats.findUnique({ where: { userId: auth.userId } })
  if (!userStats) {
    await prisma.userStats.create({
      data: { userId: auth.userId },
    })
  }
}

export default requireAuth
