'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tb_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      pages: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      bookFile: {
        type: Sequelize.STRING
      },
      bookCover: {
        type: Sequelize.STRING
      },
      publicationDate: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tb_books');
  }
};