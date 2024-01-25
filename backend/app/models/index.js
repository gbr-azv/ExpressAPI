const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./roles.model.js")(sequelize, Sequelize);

/*db.role.belongsToMany(db.user, {
    through: "user_roles",
    as: "userRoles",
    foreignKey: "role_id",
    otherKey: "user_id"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  as: "roleUsers",
  foreignKey: "user_id",
  otherKey: "role_id"
});*/

db.role.belongsToMany(db.user, {
  through: "user_roles"
});

db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin"];

module.exports = db;