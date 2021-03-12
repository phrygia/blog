const dotenv = require('dotenv')  //환경 변수를 파일에 저장할 수 있도록 해주는 dotenv 라이브러리
dotenv.config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT
}