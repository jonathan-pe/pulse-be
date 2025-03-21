import { getAuth } from '@clerk/express'
import { NextFunction, Request, Response } from 'express'
import { prisma } from '../db'

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const auth = getAuth(req)

  if (process.env.NODE_ENV === 'development') {
    console.log('auth', auth)
    next()
    return
  }

  if (!auth || !auth.userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  // TODO: Eventually we'll want to hook up to Webhooks to create userStats
  // upon Clerk event of user creation
  const userStats = await prisma.userStats.findUnique({ where: { userId: auth.userId } })
  if (!userStats) {
    await prisma.userStats.create({
      data: { userId: auth.userId },
    })
  }

  next()
}

export default requireAuth
