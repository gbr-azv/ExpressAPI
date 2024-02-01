
exports.verifySignUpReq = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password ||
        !req.body.phone || !req.body.address) {
        res.status(400).send({
            message: "Fill in all fields!"
        });
        return;
    }
    return;
};

exports.verifyPwdReq = (req, res) => {
    if (!req.body.password || !req.body.newPwd ||
        !req.body.repeatNewPwd) {
        res.status(400).send({
            message: "Fill in all fields!"
        });
        return;
    }
    return;
};