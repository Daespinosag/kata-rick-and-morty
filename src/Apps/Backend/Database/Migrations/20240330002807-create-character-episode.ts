
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:typeof DataTypes) {
    await queryInterface.createTable('character_episode', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    });

    await queryInterface.addColumn('character_episode','character_id',{ 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'characters', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    )

    await queryInterface.addColumn('character_episode','episode_id',{ 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'episodes', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  )

  },
  async down(queryInterface:QueryInterface, Sequelize:any) {
    await queryInterface.dropTable('character_episode');
  }
};