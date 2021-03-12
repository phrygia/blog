const express = require('express')
const hpp = require('hpp');
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/index')

//Routes 
const postsRoutes = require('./routes/api/posts')
const userRoutes = require('./routes/api/user')
const authRoutes = require('./routes/api/auth')

const app = express();
const { MONGO_URI } = config

if (process.env.NODE_ENV === 'production') {
    //서버의 각종 취약점을 보완해주는 패키지들이며, 익스프레스 미들웨어로서 사용할 수 있다. 
    app.use(hpp)
    app.use(helmet())
} else {
    app.use(morgan('dev')); //개발 로그를 보여줌 
}

app.use(cors({
    origin: true,   // 모두 허용
    credentials: true   //  cors설정은 브라우저 header에 추가 
}))

app.use(express.json())

mongoose.connect( MONGO_URI ,{
    useUnifiedTopology:true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(() => console.log('MongoDB connection success...'))
.catch((err) => console.log(err))

// use routes
app.get('/')
app.use('/api/post', postsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

module.exports = app;