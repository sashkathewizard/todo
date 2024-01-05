import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

const sequelize = new Sequelize(
  process.env.DB_DATABASE ?? 'postgres',
  process.env.DB_USERNAME ?? 'postgres',
  process.env.DB_PASSWORD ?? 'postgres',
  {
    host: process.env.DB_HOST ?? 'db',
    dialect: 'postgres',
    port: 5432
  }
)

export { sequelize }
