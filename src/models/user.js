'use strict';
const bcrypt = require('bcrypt');
const {SALT_ROUND} = require('../config/serverConfig');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {through: "User_Roles", foreignKey: "UserId"});
    }
  }
  User.init({
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((data) => {
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUND));
    data.password = bcrypt.hashSync(data.password, salt);
  })
  return User;
};