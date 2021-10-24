'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_profile.belongsTo(models.tb_user, {
        as: "userProfile",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  };
  tb_profile.init({
    idUser: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_profile',
  });
  return tb_profile;
};