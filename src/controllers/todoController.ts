import { Todo } from '../models/todo'
import { type Response } from 'express'
import { type MyRequest } from '../types/request'

class TodoController {
  async add (req: MyRequest, res: Response): Promise<any> {
    if (req.userData.userId != null) {
      const { title, description } = req.body
      if (title === null || description === null) {
        return res.status(400).json({ message: 'Title and description are required' })
      }
      const todo = Todo.create({
        title,
        description,
        userId: req.userData.userId
      })

      return res.json({ todo }).status(201)
    } else {
      return res.status(404)
    }
  }

  async getAll (req: MyRequest, res: Response): Promise<any> {
    const todos: Todo[] | null = await Todo.findAll({ where: { userId: req.userData.userId } })
    if (todos.length === 0) {
      res.json({ message: 'Not found' }).status(404)
    }
    return res.json({ todos }).status(201)
  }

  async getOne (req: MyRequest, res: Response): Promise<any> {
    const todo: Todo | null = await Todo.findOne({
      where: {
        id: req.params.id, userId: req.userData.userId
      }
    })

    if (todo === null) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    return res.json({ todo }).status(200)
  }

  async update (req: MyRequest, res: Response): Promise<any> {
    const id = req.params.id
    const title: string | null = req.body.title
    const description: string | null = req.body.description

    if (id === null) {
      return res.status(400).json({ message: 'ID is required for updating todo' })
    }

    if (title === null && description === null) {
      return res.status(400).json({ message: 'Title or description is required for updating todo' })
    }

    const updatedTodo: [number, Todo[]] = await Todo.update(
      { title, description },
      {
        where: {
          id, userId: req.userData.userId
        },
        returning: true
      }
    )

    if (updatedTodo[0] === 0) {
      return res.status(404).json({ message: `Todo with ID ${id} not found` })
    }

    const updatedRecord = updatedTodo[1][0]

    return res.status(200).json({ message: 'Todo updated successfully', todo: updatedRecord })
  }

  async delete (req: MyRequest, res: Response): Promise<any> {
    const id = req.params.id

    if (id === null) {
      return res.status(400).json({ message: 'ID is required for deleting todo' })
    }

    const deletedTodo = await Todo.destroy(
      { where: { id, userId: req.userData.userId } }
    )

    if (deletedTodo != null) {
      res.json({ message: 'Deleted successfully' }).status(201)
    } else {
      res.json({ message: 'Not found' }).status(404)
    }
  }
}

const todoController = new TodoController()

export default todoController
