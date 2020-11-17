const express = require('express')

const dotenv = require ('dotenv').config()
const connectDB = require ('./config/db')
const passport = require('passport')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require ('cookie-parser')
const app = express()
const errorHandler = require('./middlewares/errorHandler')

app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:3000',
    credentials : true
}))
//Passport

require('./config/passport')(passport)

//body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(passport.initialize())

connectDB()

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
} 



//Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/users',require ('./routes/user'))


app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT,()=> console.log(`Server listening on ${PORT}`))