require('dotenv').config({ path: 'C:/Dev/App/backend/.env' });
const initial = require('./models/insert.roles');
const express = require('express');
const cors = require('cors');
const db = require("./models/index");
const port = process.env.PORT;

const app = express();

let corsOptions = {
    origin: `http://localhost:${port}`
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true })
    .then(() => {
        initial();
        console.log("Drop and Resync Db");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

require('./routes/user.route')(app);
require('./routes/auth.route')(app);

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});