'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_transaction.belongsTo(models.tb_user, {
        as: "tb_user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  };
  tb_transaction.init({
    idUser: DataTypes.INTEGER,
    transferProof: DataTypes.STRING,
    remainingAcvite: DataTypes.INTEGER,
    userStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_transaction',
  });
  return tb_transaction;
};