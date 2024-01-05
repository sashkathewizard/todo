import jwt from 'jsonwebtoken'
import { type NextFunction, type Response } from 'express'
import { type MyRequest } from '../types/request'
import { TokenStorage } from '../models/tokenStorage'

const authMiddleware = async (req: MyRequest, res: Response, next: NextFunction): Promise<void> => {
  req.userData = { userId: 0 }
  const token: string | undefined = req.headers.authorization?.split(' ')[1]

  if (token !== undefined) {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET ?? 'supersecret') as jwt.JwtPayload
    if (decodedToken.userId !== null && req.userData !== undefined) {
      const tokenStorage: TokenStorage | null = await TokenStorage.findOne({
        where: {
          token
        }
      })
      if (tokenStorage !== null) {
        if (tokenStorage.token === token) {
          req.userData.userId = decodedToken.userId

          next()
        } else {
          res.status(404).json({ message: 'Error! Token not valid, login again' })
        }
      } else {
        res.status(404).json({ message: 'Error! U never logged in yet' })
      }
    }
  } else {
    res.status(404).json({ message: 'Error! Send a token' })
  }
}

export default authMiddleware
