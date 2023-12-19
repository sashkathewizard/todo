import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import { sequelize } from './database'
import { initTodoModel } from './models/todo'
import { router } from './routes'
import { initUserModel } from './models/user'
import { errorMiddleware } from './middleware/errorMiddleware'

dotenv.config()
console.log(process.env.DB_DATABASE)

const app: Express = express()
const port = process.env.PORT ?? 3003
app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.listen(port, async (): Promise<void> => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  try {
    await sequelize.authenticate()
    await initTodoModel()
    await initUserModel()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})
