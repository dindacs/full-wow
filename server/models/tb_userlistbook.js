'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_userlistbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_userlistbook.belongsTo(models.tb_user, {
        as: "tb_user",
        foreignKey: {
          name: "idUser",
        },
      });
      tb_userlistbook.belongsTo(models.tb_book, {
        as: "tb_book",
        foreignKey: {
          name: "idBook",
        },
      });
    }
  };
  tb_userlistbook.init({
    idUser: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_userlistbook',
  });
  return tb_userlistbook;
};