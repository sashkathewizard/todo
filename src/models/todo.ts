import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../database'

class Todo extends Model {
  public id!: number
  public title!: string
  public description!: string
  public userId!: string
  public iscompleted!: boolean
}

async function initTodoModel (): Promise<void> {
  Todo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      iscompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Todo',
      tableName: 'Todos'
    }
  )
}

export { Todo, initTodoModel }
