import { Router } from 'express'
import { todoRouter } from './todoRouter'
import { userRouter } from './userRouter'
import { authRouter } from './authRouter'

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/todos', todoRouter)

export { router }
