'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "Orders",
      "total",
      {
        type: Sequelize.FLOAT,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "Orders",
      "total",
      {
        type: Sequelize.INTEGER,
      }
    )
  }
};
