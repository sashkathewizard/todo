import type express from 'express'

interface MyRequest extends express.Request {
  userData: {
    userId: string
  }
}
