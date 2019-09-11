require ('dotenv').config()

const session = require('express-session')
const express = require ('express')
const cors = require('cors')
const massive = require('massive')

//controller
const Ctrl = require('./controller')

//env variables
const {
    CONNECTION_STRING,
    SERVER_PORT,
    SESSION_SECRET
} = process.env


//app instance
const app = express()



//TLM
app.use(express.json())
app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        makeAge: 60000

    }
}))


//databse connection
massive(CONNECTION_STRING)
    .then(dbInstance => {
        app.set('db', dbInstance)
        console.log('database is linked')
    })
    .catch(error => {
        console.log(error)
    })


//endpoints
app.get('/api/auth/logout', Ctrl.logout)
app.post('/api/auth/login', Ctrl.login)
app.post('/api/auth/register', Ctrl.register)



//server listening
app.listen(SERVER_PORT, ()=> console.log(`server ${SERVER_PORT} is lit`))