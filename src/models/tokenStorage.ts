import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database'

class TokenStorage extends Model {
  public id!: number
  public userId!: string
  public token!: string
}

async function initTokenStorageModel (): Promise<void> {
  TokenStorage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'tokenStorage',
      tableName: 'Tokens'
    }
  )
}

export { TokenStorage, initTokenStorageModel }
