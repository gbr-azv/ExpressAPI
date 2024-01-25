const DataTypes = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define("roles", {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    });

    return role;
};