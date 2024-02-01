const db = require("../models/index");
const { authJwt } = require("../middleware");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");
const parse = require("../utils/verify.body.req");
const validate = require("../utils/pwd");

exports.signup = (req, res) => {

  parse.verifySignUpReq(req, res);

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
            return res.status(201).send({
              "ID": user_id,
              "E-mail": email,
              "Created At": createdAt
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          return res.status(201).send({
            "ID": user_id,
            "E-mail": email,
            "Created At": createdAt
          });
        });
      }
    })
    .catch(err => {
      console.error(`Error creating user: ${err}`);
      return res.status(500).send({ message: err.message });
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
        return res.status(404).send({
          message: "Invalid Credentials ;("
        });
      }

      validate.passwordIsValid(req, res, user);

      const token = authJwt.createToken(user);

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        return res.status(200).send({
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      console.error(`Error logging into the system: ${err}`);
      return res.status(500).send({ message: err.message });
    });
};

exports.changePwd = (req, res) => {

  const id = req.userId;
  parse.verifyPwdReq(req, res);

  User.findByPk(id)
    .then(user => {
      if (user) {
        validate.passwordIsValid(req, res, user);

        if (req.body.newPwd == req.body.repeatNewPwd) {
          let newPwd = bcrypt.hashSync(req.body.newPwd, 8);
          User.update({ password: newPwd }, {
            where: { user_id: id }
          })
            .then(() => {
              return res.status(200).send({
                message: `Password updated succesfully.`
              });
            })
            .catch(err => {
              console.error(`Error updating password: ${err}`);
              return res.status(304).send({
                message: `Error updating password`
              });
            })
        } else {
          return res.status(400).send({
            message: `Error - Both passwords must be the same.`
          });
        }
      } else {
        return res.status(404).send({
          message: `Cannot find user with id: ${id}.`
        });
      }
    })
    .catch(err => {
      console.error(`Error finding user: ${err}`);
      return res.status(500).send({
        message: `Error finding user with id: ${id}.`
      });
    });
};