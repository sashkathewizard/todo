import { Router } from 'express'
import { UserController } from '../controllers/userController'

const userRouter = Router()
const userController: UserController = new UserController()

userRouter.get('/', userController.getAll)

userRouter.get('/:id', userController.getOne)

userRouter.put('/:id', userController.update)

userRouter.delete('/:id', userController.delete)

export { userRouter }
