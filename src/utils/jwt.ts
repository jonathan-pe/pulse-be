// src/utils/jwt.js

import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.AUTH_SECRET!

export const signToken = (payload: any) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }) // Adjust expiration as needed
}

export const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}
