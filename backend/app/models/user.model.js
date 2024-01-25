const DataTypes = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    });
  
    return user;
  };