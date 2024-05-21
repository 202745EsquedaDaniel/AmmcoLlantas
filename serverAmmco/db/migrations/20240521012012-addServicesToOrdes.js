'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Orders', 'alineacion', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.addColumn('Orders', 'balanceo', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.addColumn('Orders', 'pivotes', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Orders', 'alineacion');
    await queryInterface.removeColumn('Orders', 'balanceo');
    await queryInterface.removeColumn('Orders', 'pivotes');
  }
};
