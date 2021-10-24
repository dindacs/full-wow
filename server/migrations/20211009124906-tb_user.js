'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'tb_users', // table name
        'gender', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'tb_users',
        'phone',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'tb_users',
        'address',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'tb_users',
        'avatar',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('tb_users', 'gender'),
      queryInterface.removeColumn('tb_users', 'phone'),
      queryInterface.removeColumn('tb_users', 'address'),
      queryInterface.removeColumn('tb_users', 'avatar'),
    ]);
  },

};
