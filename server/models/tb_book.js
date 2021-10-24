'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_book.hasMany(models.tb_userlistbook, {
        as: 'tb_book',
        foreignKey: {
          name: 'idUser',
        },
      });
    }
  };
  tb_book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    pages: DataTypes.STRING,
    isbn: DataTypes.STRING,
    about: DataTypes.TEXT,
    bookFile: DataTypes.STRING,
    publicationDate: DataTypes.DATEONLY,
    bookCover: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tb_book',
  });
  return tb_book;
};