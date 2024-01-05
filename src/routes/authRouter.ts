import { Router } from 'express'
import { UserController } from '../controllers/userController'

const authRouter = Router()
const userController: UserController = new UserController()

// eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
authRouter.post('/login', userController.login)

// eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
authRouter.post('/registration', userController.registration)

// eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
authRouter.post('/forgot-password', userController.forgotPassword)

export { authRouter }
