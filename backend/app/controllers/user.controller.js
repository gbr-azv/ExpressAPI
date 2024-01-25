const db = require("../models/index");
//const User = db.user;
//const Op = db.Sequelize.Op;

exports.publicAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userAcess = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminAcess = (req, res) => {
  res.status(200).send("Admin Content.");
};