const express = require('express')
const connectToDb = require('./config/db.js')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes.js')
require('dotenv').config() // this is to use the .env file to store environment variables like PORT, MONGO_URI, etc

//Express middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//init connection to db
connectToDb()

app.use('/', userRoutes) 

module.exports = app