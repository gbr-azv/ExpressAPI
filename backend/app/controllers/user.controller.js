const db = require("../models/index");
const User = db.user;
//const Op = db.Sequelize.Op;

exports.userData = (req, res) => {

  const id = req.userId;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send({
          "ID": data.user_id,
          "Name": data.name,
          "E-mail:": data.email,
          "Phone": data.phone,
          "Address": data.adress
        });
      } else {
        res.status(404).send({
          message: `Cannot find user with id: ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving user with id: ${id}.`
      });
    });
};

exports.userAcess = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminAcess = (req, res) => {
  res.status(200).send("Admin Content.");
};