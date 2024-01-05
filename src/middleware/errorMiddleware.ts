import { type NextFunction, type Request, type Response } from 'express'
import { type MyError } from '../types/error'
export const errorMiddleware = (err: MyError, req: Request, res: Response, next: NextFunction): void => {
  if (process.env.MODE === 'dev') {
    console.error(err)
  }
  if (err.statusCode != null) {
    res.status(err.statusCode).json({ message: err.message })
    next()
  } else {
    res.status(500).json({ message: 'Iternal server error' })
  }
}
