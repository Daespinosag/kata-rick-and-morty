import { Model, DataTypes } from 'sequelize';
import connection from '../Connection';
import Character from './character';


class Episode extends Model {

}

Episode.init(
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
    air_date: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    episode: {
      allowNull: true,
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
    modelName: 'episode',
    tableName: 'episodes',
    timestamps: false,
  }
);

Episode.belongsToMany(Character, {
  through: 'character_episode',
  foreignKey: 'episode_id',
  otherKey: 'character_id' 
});

export default Episode;
