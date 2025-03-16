import { AuthObject } from '@clerk/express'
import { YogaInitialContext } from 'graphql-yoga'

export interface YogaExpressContextWithAuth extends YogaInitialContext {
  req: Request & { auth: AuthObject }
}
