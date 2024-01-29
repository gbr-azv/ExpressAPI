require('dotenv').config({ path: 'C:/Dev/App/backend/.env' });
const express = require('express');

const initial = require('./models/insert.roles');
const conn = require("./utils/db.conn");
const corsConfig = require("./config/cors.config");
const db = require("./models/index");
const port = process.env.PORT;

const app = express();

app.use(corsConfig.configureCors(port));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

conn.dbConn(db, initial);

require('./routes/user.route')(app);
require('./routes/auth.route')(app);
require('./routes/admin.route')(app);

app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
});