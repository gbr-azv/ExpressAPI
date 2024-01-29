const cors = require('cors');

exports.corsConfig = (port) => {
    let corsOptions = {
        origin: `http://localhost:${port}`
    };
    return cors(corsOptions);
};

exports.corsHeader = (req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
};
