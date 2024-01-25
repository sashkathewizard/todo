import { Router } from 'express'
import UserController from '../controllers/userController'

const authRouter = Router()

authRouter.post('/login', UserController.login)
authRouter.post('/registration', UserController.registration)
authRouter.post('/forgot-password', UserController.forgotPassword)
authRouter.post('/reset-password', UserController.resetPassword)

export { authRouter }
