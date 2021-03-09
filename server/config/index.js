const dotenv = require('dotenv')
dotenv.config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SERECT: process.env.JWT_SERECT,
    PORT: process.env.PORT
}