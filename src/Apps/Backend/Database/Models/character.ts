import { Model, DataTypes } from 'sequelize';
import connection from '../Connection';
import Place from './place';
// import Episode from './episode';
//import CharacterAttributes from './Contracts/CharacterAttributes';

class Character extends Model {
}

Character.init(
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    location_id: {
      allowNull: true,
      type: DataTypes.NUMBER,
    },
    origin_id: {
      allowNull: true,
      type: DataTypes.NUMBER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    status: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    species: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    gender: {
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
    modelName: 'character',
    tableName: 'characters',
    timestamps: false,
  }
);

Character.belongsTo(Place, {
  as: 'location',
  foreignKey: {
    name: 'location_id',
    allowNull: true,
  },
  foreignKeyConstraint: true,
});

Character.belongsTo(Place, {
  as: 'origins',
  foreignKey: {
    name: 'origin_id',
    allowNull: true,
  },
  foreignKeyConstraint: true,
});

// Character.belongsToMany(Episode, {
//   through: 'character_episode',
//   foreignKey: 'character_id',
//   otherKey: 'episode_id' ,
// });

export default Character;