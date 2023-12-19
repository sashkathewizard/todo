import { Router } from 'express'
import { TodoController } from '../controllers/todoController'

const todoRouter = Router()
const todoController: TodoController = new TodoController()
// // eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
// todoRouter.post('/', todoController.add)
// eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
todoRouter.get('/', todoController.getAll)

todoRouter.get('/:id', todoController.getOne)
// eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
todoRouter.put('/:id', todoController.update)
// eslint-disable-next-line @typescript-eslint/no-misused-promises,@typescript-eslint/unbound-method
todoRouter.delete('/:id', todoController.delete)

export { todoRouter }
