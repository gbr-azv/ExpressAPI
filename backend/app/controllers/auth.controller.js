const db = require("../models/index");
const { authJwt } = require("../middleware");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const parse = require("../utils/verify.body.req");
const validate = require("../utils/pwd");

exports.signup = (req, res) => {

  parse.verifyBodyReq(req, res);

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    address: req.body.address
  })
    .then(user => {
      const user_id = user.dataValues.user_id;
      const email = user.dataValues.email;
      const createdAt = user.dataValues.createdAt;
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({
              "ID": user_id,
              "E-mail": email,
              "Created At": createdAt
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({
            "ID": user_id,
            "E-mail": email,
            "Created At": createdAt
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Invalid Credentials ;(" });
      }

      validate.passwordIsValid(req, res, user);

      const token = authJwt.createToken(user);

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};