const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/all", controller.publicAccess);

    app.get(
        "/user",
        [authJwt.verifyToken],
        controller.userAcess
    );

    app.get(
        "/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminAcess
    );

};