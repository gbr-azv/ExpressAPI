const db = require('./index');
const Role = db.role;
//const Op = db.Sequelize.Op;

function initial() {
    Role.create({
      name: "admin"
    });
   
    Role.create({
      name: "user"
    });
  };

module.exports = initial;