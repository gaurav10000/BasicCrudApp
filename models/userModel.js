const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Name cannot exceed 30 characters'],

    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
})

module.exports = mongoose.model("User", userSchema)