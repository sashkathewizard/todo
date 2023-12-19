import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

const sequelize = new Sequelize(
  process.env.DB_DATABASE ?? 'todo-db',
  'postgres',
  'postgres',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5434
  }
)

export { sequelize }
