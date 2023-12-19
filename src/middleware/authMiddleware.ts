import jwt from 'jsonwebtoken'
import { type NextFunction, type Response } from 'express'
import { type MyRequest } from '../types/request'

export const authMiddleware = (req: MyRequest, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.headers.authorization?.split(' ')[1]

  if (token != null) {
    const decodedToken = jwt.verify(token, 'superset' || process.env.JWTSECRET) as jwt.JwtPayload
    req.userData = { userId: decodedToken.userId }
    next()
  } else {
    res.status(404).json({ message: 'Error! Send a token' })
  }
}
