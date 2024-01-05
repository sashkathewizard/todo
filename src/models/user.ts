import { Model, DataTypes } from 'sequelize'
import { Todo } from './todo'
import { sequelize } from '../database'
import { TokenStorage } from './tokenStorage'

class User extends Model {
  public id!: number
  public username!: string
  public email!: string
  public password!: string
  public role!: string
}

async function initUserModel (): Promise<void> {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users'
    }
  )
  User.hasMany(Todo, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
  })
  User.hasMany(TokenStorage, {
    onDelete: 'CASCADE',
    foreignKey: 'userId'
  })
}

export { User, initUserModel }
