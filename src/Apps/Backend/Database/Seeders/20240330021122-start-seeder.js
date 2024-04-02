'use strict';

const path = require('path');

const CharacterSeederLoader = require('../Shared/CharacterSeederLoader').default; 

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const characterSeeder = new CharacterSeederLoader(path.resolve('./src/Apps/Backend/Database/Shared/base_seeder_information.json'));
    await characterSeeder.insertOrUpdateCharacters();
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
