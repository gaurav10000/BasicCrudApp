require('dotenv').config()
const express = require('express')
const connectToDb = require('./config/db.js')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/userRoutes.js')

//Express middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//init connection to db
connectToDb()

app.get('/', userRoutes)

module.exports = app