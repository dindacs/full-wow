'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_chat.belongsTo(models.tb_user, {
        as: "sender",
        foreignKey: {
          name: "idSender",
        },
      });
      tb_chat.belongsTo(models.tb_user, {
        as: "recipient",
        foreignKey: {
          name: "idRecipient",
        },
      });
    }
  };
  tb_chat.init({
    message: DataTypes.TEXT,
    idSender: DataTypes.INTEGER,
    idRecipient: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_chat',
  });
  return tb_chat;
};