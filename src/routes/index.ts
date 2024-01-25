import { Router } from 'express'
import { todoRouter } from './todoRouter'
import { userRouter } from './userRouter'
import { authRouter } from './authRouter'
import authMiddleware from '../middleware/authMiddleware'
import { type MyRequest } from '../types/request'
import { adminRouter } from './adminRouter'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)

router.use('/admin', adminRouter)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.use('/todos', authMiddleware as (req: MyRequest) => Promise<void>, todoRouter)

export { router }
