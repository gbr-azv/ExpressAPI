require('dotenv').config({ path: 'C:/Dev/App/backend/.env' });

module.exports = {
    secret: process.env.SECRET_KEY
};