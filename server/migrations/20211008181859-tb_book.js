'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'tb_books',
      'bookCover',
      Sequelize.STRING
    );

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'tb_books',
      'bookCover',
    );
  }
};
