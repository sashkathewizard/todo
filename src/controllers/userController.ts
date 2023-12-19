import { type Request, type Response } from 'express'
import { User } from '../models/user'
import * as nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

export class UserController {
  async registration (req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body
    if (typeof (email) !== 'string') {
      res.json({ message: 'Email! string required' })
    }
    if (typeof (password) !== 'string') {
      res.json({ message: 'Password! string required' })
    }
    const user: User = await User.create({
      username,
      email,
      password
    })

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWTSECRET ?? 'supersecret', { expiresIn: '24h' })

    res.status(201).json({ user, token })
  }

  async forgotPassword (req: Request, res: Response): Promise<void> {
    const { email } = req.body

    if (typeof email !== 'string') {
      throw new Error('Invalid input data')
    }

    const user = await User.findOne({ where: { email } })

    if (user === null) {
      throw new Error('User not found!')
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET ?? 'supersecret', { expiresIn: '24h' })

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 587,
      secure: false,
      auth: {

        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
      }
    })

    await transporter.sendMail({
      from: 'oleksandr91145@gmail.com',
      to: email,
      subject: 'Password reset token',
      text: `Your token to password reset: \n ${token}`
    })

    res.status(200).json({ message: 'Password reset token sent successfuly' })
  }

  async getAll (req: Request, res: Response): Promise<void> {
  }

  async getOne (req: Request, res: Response): Promise<void> {

  }

  async update (req: Request, res: Response): Promise<void> {

  }

  async delete (req: Request, res: Response): Promise<void> {

  }

  async login (req: Request, res: Response): Promise<void> {
    const { email, password } = req.body

    if (typeof email !== 'string') {
      throw new Error('Invalid input data')
    }
    const user: User | null = await User.findOne({
      where: { email }
    })

    if (user === null) {
      throw new Error('User not found')
    }

    if (password === user.password) {
      const token: string = jwt.sign({
        userId: user.id,
        email: user.email
      },
      process.env.JWTSECRET ?? 'supersecret',
      { expiresIn: '24h' })

      res.json({
        message: 'User logged in succesfully',
        token
      })
    } else {
      res.json({
        message: 'Password incorrect'
      })
    }
  }
}
