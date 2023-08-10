const express = require('express')

const {home, register, login} = require('../controllers/userController.js')


const router = express.Router()

router.get('/', home)
router.post('/register', register)
router.post('/login', login)

module.exports = router