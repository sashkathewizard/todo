import { type Request } from 'express'

interface MyRequest extends Request {
  userData: {
    userId: number
  }
}

export type { MyRequest }
