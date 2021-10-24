'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_user.hasMany(models.tb_transaction, {
        as: 'tb_transaction',
        foreignKey: {
          name: 'idUser',
        }
      });
      tb_user.hasOne(models.tb_profile, {
        as: 'userProfile',
        foreignKey: {
          name: 'idUser',
        },
      });
      tb_user.hasMany(models.tb_userlistbook, {
        as: 'userListBook',
        foreignKey: {
          name: 'idUser',
        },
      });
      tb_user.hasMany(models.tb_chat, {
        as: "senderMessage",
        foreignKey: {
          name: "idSender",
        },
      });
      tb_user.hasMany(models.tb_chat, {
        as: "recipientMessage",
        foreignKey: {
          name: "idRecipient",
        },
      });
    }
  };
  tb_user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.TEXT,
    avatar: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tb_user',
  });
  return tb_user;
};