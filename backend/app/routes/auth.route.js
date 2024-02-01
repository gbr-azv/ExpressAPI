const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const { corsHeader } = require("../config/cors.config");
const controller = require("../controllers/auth.controller");

module.exports = (app) => {

  app.use(corsHeader);

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkEmailDuplication,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/auth/signin", controller.signin);

  app.patch(
    "/auth/pwd",
    [authJwt.verifyToken],
    controller.changePwd
  );

};