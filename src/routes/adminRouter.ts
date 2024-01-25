import { Router } from 'express'
import { AdminController } from '../controllers/adminController'

const adminRouter = Router()
const adminController = new AdminController()

adminRouter.get('/', adminController.signInForm)

adminRouter.get('/home', adminController.todosFrom)

adminRouter.post('/login', adminController.login)

adminRouter.get('/users', adminController.usersFrom)

adminRouter.get('/todos', adminController.todosFrom)

adminRouter.delete('/todos/:id', adminController.deleteTodo)

adminRouter.post('/find-user', adminController.findUser)

adminRouter.post('/change-completion/:id', adminController.changeCompletion)

export { adminRouter }
