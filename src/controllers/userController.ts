import { type Request, type Response } from 'express'
import { User } from '../models/user'
import * as nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import { TokenStorage } from '../models/tokenStorage'

export class UserController {
  async saveToken (userId: number, token: string): Promise<void> {
    const tokenStorage = await TokenStorage.create({
      userId,
      token
    })

    if (process.env.MODE === 'dev') {
      console.log('token saved succesfully, token:', tokenStorage, 'userID: ', userId)
    } else {
      console.log('token saved succesfully')
    }
  }

  async destroyToken (userId: number): Promise<void> {
    const tokenStorage = await TokenStorage.destroy({
      where: { userId }
    })

    if (process.env.MODE === 'dev') {
      console.log('deleted: ', tokenStorage)
    }
  }

  async registration (req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body
    if (typeof (email) !== 'string') {
      res.json({ message: 'Email! string required' })
    }
    if (typeof (password) !== 'string') {
      res.json({ message: 'Password! string required' })
    }

    if (username !== null && email !== null && password !== null) {
      const user: User = await User.create({
        username,
        email,
        password
      })

      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWTSECRET ?? 'supersecret', { expiresIn: '365d' })

      const tokenStorage = await TokenStorage.create({
        userId: user.id,
        token
      })

      if (process.env.MODE === 'dev') {
        console.log('token saved succesfully, token:', tokenStorage, 'userID: ', user.id)
      } else {
        console.log('token saved succesfully')
      }

      res.json({ user, token })
    } else {
      res.status(400).json({ message: 'Error! Bad request' })
    }
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

    // const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET ?? 'supersecret', { expiresIn: '24h' })

    const tokenStorage: TokenStorage | null = await TokenStorage.findOne({
      where: {
        userId: user.id
      }
    })
    if (tokenStorage !== null) {
      const token = tokenStorage.token

      const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '8f5448949f3836',
          pass: '47cad53df57124'
        }
      })

      const mailOptions = {
        from: 'Jacob!',
        to: email,
        subject: 'Password reset token',
        text: `Your token to password reset: \n ${token}`
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error != null) {
          console.log(error)
          res.status(200).json({ message: 'Unknown error' })
        } else {
          console.log('Email sent: ' + info.response)
          res.status(200).json({ message: 'Password reset token sent successfuly' })
        }
      })
    } else {
      if (process.env.MODE === 'dev') {
        res.status(404).json({ message: 'token not found' })
      } else {
        res.status(404).json({ message: 'something went wrong, please try again' })
      }
    }
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
      // delete old token
      const tokenStorageOld = await TokenStorage.destroy({
        where: { userId: user.id }
      })
      // save new token
      const tokenStorage = await TokenStorage.create({
        userId: user.id,
        token
      })
      if (process.env.MODE === 'dev') {
        console.log('deleted: ', tokenStorageOld)
        console.log('saved: ', tokenStorage)
      }

      res.json({
        message: 'User logged in succesfully',
        token,
        user
      })
    } else {
      res.json({
        message: 'Password incorrect'
      })
    }
  }
}
