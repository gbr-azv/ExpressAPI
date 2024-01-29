const db = require("../models/index");
const User = db.user;
//const Op = db.Sequelize.Op;

exports.getUser = (req, res) => {

  const id = req.userId;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send({
          "ID": data.user_id,
          "Name": data.name,
          "E-mail:": data.email,
          "Phone": data.phone,
          "Address": data.address
        });
      } else {
        res.status(404).send({
          message: `Cannot find user with id: ${id}.`
        });
      }
    })
    .catch(err => {
      console.error(`Error retrieving user: ${err}`);
      res.status(500).send({
        message: `Error retrieving user with id: ${id}.`
      });
    });
};

exports.deleteUser = (req, res) => {

  const id = req.userId;

  User.destroy({ where: { user_id: id } })
    .then((rowsDeleted) => {
      if (rowsDeleted) {
        res.status(204).send();
      } else {
        res.status(404).send({
          message: `Cannot find user with id: ${id}.`
        });
      }
    })
    .catch(err => {
      console.error(`Error deleting user: ${err}`);
      res.status(500).send({
        message: `Error deleting user with id: ${id}.`
      });
    });
};

exports.updateUser = (req, res) => {

  const id = req.userId;

  User.update(req.body, {
    where: { user_id: id },
    returning: true,
    plain: true
  })
    .then((updatedData) => {
      if (updatedData[1]) {
        data = updatedData[1];
        res.status(200).send({
          "ID": data.user_id,
          "Name": data.name,
          "E-mail:": data.email,
          "Phone": data.phone,
          "Address": data.address
        });
      } else {
        res.status(404).send({
          message: `Cannot find user with id: ${id}.`
        });
      }
    })
    .catch(err => {
      console.error(`Error updating user: ${err}`);
      res.status(500).send({
        message: `Error updating user with id: ${id}.`
      });
    });
};