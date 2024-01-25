import { type Request, type Response } from 'express'
import { User } from '../models/user'
import { Todo } from '../models/todo'

export class AdminController {
  async index (req: Request, res: Response): Promise<void> {
    res.render('pages/index')
  }

  async usersFrom (req: Request, res: Response): Promise<void> {
    const users: User[] = await User.findAll()
    res.render('pages/users', { users })
  }

  async todosFrom (req: Request, res: Response): Promise<void> {
    const users: User[] = await User.findAll()
    const todos: Todo[] = await Todo.findAll()
    res.render('pages/todos', { todos, users })
  }

  async deleteTodo (req: Request, res: Response): Promise<void> {
    const id = req.params.id

    const deletedTodo = await Todo.destroy({ where: { id } })

    if (deletedTodo !== null) {
      res.status(201).json({ message: 'Todo deleted successfully' })
    } else {
      res.json({ message: 'Error deleting todo' }).status(400)
    }
  }

  async login (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    const user: User | null = await User.findOne({ where: { email } })

    if (user !== null) {
      if (user.password === password) {
        if (user.role === 'admin') {
          res.status(201).json({ message: 'Success!' })
        } else {
          res.json({ message: 'You are not admin!' })
        }
      } else {
        res.json({ message: 'Incorrect password' })
      }
    } else {
      res.json({ message: 'User not found' }).status(404)
    }
  }

  async signInForm (req: Request, res: Response): Promise<void> {
    res.render('pages/sign-in')
  }

  async findUser (req: Request, res: Response): Promise<void> {
    const { email } = req.body

    if (email != null) {
      try {
        const user = await User.findOne({ where: { email } })

        if (user !== null) {
          res.json({ user: user }).status(201)
        } else {
          res.json({ message: 'User not found' }).status(404)
        }
      } catch (error) {
        console.error('Error finding user:', error)
        res.json({ message: 'Error finding user' }).status(500)
      }
    } else {
      res.json({ message: 'Enter email' }).status(400)
    }
  }

  async changeCompletion (req: Request, res: Response): Promise<void> {
    const id = req.params.id

    if (id !== null) {
      const todo: Todo | null = await Todo.findByPk(id)
      if (todo !== null) {
        todo.iscompleted = !todo.iscompleted

        await todo.save()

        res.json({ message: 'Success' })
      } else {
        res.json({ message: 'Error! Todo not found' }).status(404)
      }
    } else {
      res.json({ message: 'Enter an id!' }).status(400)
    }
  }
}
