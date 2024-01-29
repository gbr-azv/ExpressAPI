const { authJwt } = require("../middleware");
const { corsHeader } = require("../config/cors.config");
const controller = require("../controllers/user.controller");

module.exports = (app) => {

    app.use(corsHeader);

    app.get(
        "/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminAcess
    );

};