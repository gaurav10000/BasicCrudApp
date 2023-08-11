const express = require('express')
const {home, register, login} = require('../controllers/userController.js')


const router = express.Router() // this is the router

router.get('/', home) // this is the home route
router.post('/register', register) // this is the register route
router.post('/login', login) // this is the login route

module.exports = router