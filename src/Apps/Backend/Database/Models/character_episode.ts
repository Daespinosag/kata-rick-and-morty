import { Model, DataTypes } from 'sequelize';
import connection from '../Connection';
import Character from './character';
import Episode from './episode';

class CharacterEpisode extends Model  {

}

CharacterEpisode.init({
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    character_id: {
      allowNull: false,
      type: DataTypes.NUMBER,
    },
    episode_id: {
      allowNull: false,
      type: DataTypes.NUMBER,
    }
  },
  {
    sequelize: connection,
    modelName: 'character_episode',
    tableName: 'character_episode',
    timestamps: false,
  }
);

CharacterEpisode.belongsTo(Character, {
  as: 'character',
  foreignKey: {
    name: 'character_id',
    allowNull: false,
  },
  foreignKeyConstraint: true,
});

CharacterEpisode.belongsTo(Episode, {
  as: 'episode',
  foreignKey: {
    name: 'episode_id',
    allowNull: false,
  },
  foreignKeyConstraint: true,
});

export default CharacterEpisode;