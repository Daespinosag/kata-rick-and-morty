import { Model, DataTypes } from 'sequelize';
import connection from '../Connection';

class Place extends Model {

}

Place.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    dimension: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    created: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connection,
    modelName: 'place',
    tableName: 'places',
    timestamps: false,
  }
);

export default Place;