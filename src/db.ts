import { getAuth } from '@clerk/express'
import { PrismaClient } from '@prisma/client'
import { YogaExpressContextWithAuth } from './types/pulse'

export const prisma = new PrismaClient()

export const context = (context: YogaExpressContextWithAuth) => {
  const auth = getAuth(context.req)

  return {
    auth,
  }
}
