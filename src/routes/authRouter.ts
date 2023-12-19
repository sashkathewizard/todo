import { Router } from 'express'
import { UserController } from '../controllers/userController'

const authRouter = Router()
const userController: UserController = new UserController()

authRouter.post('/login', userController.login)

authRouter.post('/registration', userController.registration)

authRouter.post('/:id/forgot-password', userController.forgotPassword)

export { authRouter }
