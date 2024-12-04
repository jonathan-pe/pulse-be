import { PrismaClient } from '@prisma/client'
import { YogaInitialContext } from 'graphql-yoga'
import { jwtVerify, compactDecrypt } from 'jose'

const SECRET_KEY = new TextEncoder().encode(process.env.AUTH_SECRET!)
const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_SECRET!, 'base64')
const COOKIE_NAME = process.env.NODE_ENV === 'production' ? '__Secure-authjs.session_token' : 'authjs.session-token'

const prisma = new PrismaClient()

// TODO: continue to monitor Auth.js decoding and decryption
// As of right now, it's either bugged or extremely undocumented and
// difficult to work with. We've currently implemented custom encryption
// and encoding.
const _decryptJWE = async (token: string) => {
  const { plaintext } = await compactDecrypt(token!, ENCRYPTION_KEY)
  const decodedJWT = await jwtVerify(new TextDecoder().decode(plaintext), SECRET_KEY, { algorithms: ['HS512'] })
  return decodedJWT.payload
}

export const requireAuth = async (ctx: YogaInitialContext) => {
  try {
    const cookie = await ctx.request.cookieStore?.get(COOKIE_NAME)
    const sessionToken = cookie?.value

    if (!cookie || !sessionToken || sessionToken === '') {
      throw new Error('You must be logged in to perform this action')
    }

    const { sub, exp } = await _decryptJWE(sessionToken)

    if (!exp || Date.now() >= exp * 1000) {
      throw new Error('Session token has expired')
    }

    const user = await prisma.user.findUnique({ where: { id: sub } })

    if (!user) {
      throw new Error('You must be logged in to perform this action')
    }

    return user
  } catch (error) {
    console.error(error)
    throw new Error('You must be logged in to perform this action')
  }
}
