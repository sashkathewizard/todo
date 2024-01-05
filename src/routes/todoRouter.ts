import { Router } from 'express'
import todoController from '../controllers/todoController'
import type { MyRequest } from '../types/request'

const todoRouter = Router()

todoRouter.get('/', todoController.getAll as (req: MyRequest) => Promise<void>)

todoRouter.post('/', todoController.add as (req: MyRequest) => Promise<void>)

todoRouter.get('/:id', todoController.getOne as (req: MyRequest) => Promise<void>)

todoRouter.put('/:id', todoController.update as (req: MyRequest) => Promise<void>)

todoRouter.delete('/:id', todoController.delete as (req: MyRequest) => Promise<void>)

export { todoRouter }
