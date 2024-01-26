
exports.verifyBodyReq = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password ||
        !req.body.phone || !req.body.address) {
        res.status(400).send({
            message: "Fill in all fields!"
        });
        return;
    }
};