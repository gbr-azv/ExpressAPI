const bcrypt = require("bcryptjs");

exports.passwordIsValid = (req, res, user) => {
    let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    return;
};