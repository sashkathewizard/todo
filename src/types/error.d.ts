import type express from 'express'

interface MyError extends express.Request {
  statusCode: number
  message: any
}
