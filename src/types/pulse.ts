import { AuthObject } from '@clerk/express'
import { YogaInitialContext } from 'graphql-yoga'
import { Request } from 'express'

export interface YogaExpressContextWithAuth extends YogaInitialContext {
  req: Request & { auth: AuthObject }
}
