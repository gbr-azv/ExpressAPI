const { authJwt } = require("../middleware");
const { corsHeader } = require("../config/cors.config");
const controller = require("../controllers/user.controller");

module.exports = (app) => {

    app.use(corsHeader);

    app.get(
        "/user",
        [authJwt.verifyToken],
        controller.getUser
    );

    app.delete(
        "/user",
        [authJwt.verifyToken],
        controller.deleteUser
    );

    app.put(
        "/user",
        [authJwt.verifyToken],
        controller.updateUser
    );

};