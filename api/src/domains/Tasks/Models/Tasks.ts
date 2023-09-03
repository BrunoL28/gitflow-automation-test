import { CreationOptional, DataTypes, InferAttributes, Model } from 'sequelize';
import { sequelize } from '../../../../database/index';

export interface TaskInterface extends Model<InferAttributes<TaskInterface>, InferAttributes<TaskInterface>> {
  id: CreationOptional<string>;
  title: string;
  status: string;
  created_at: Date;
}

export const Task = sequelize.define<TaskInterface>( "Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
} );

