import express from 'express';
import { TodoController }  from '../controllers/todoController';

const todoRouter = express.Router();
const todoController: TodoController = new TodoController();

todoRouter.post('/', todoController.add);

todoRouter.get('/', todoController.getAll)

todoRouter.get('/:id', todoController.getOne)

todoRouter.put('/:id', todoController.update)

export { todoRouter };
