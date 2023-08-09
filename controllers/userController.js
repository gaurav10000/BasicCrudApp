
const User = require('../models/userModel.js')


exports.home =  (req, res) => {
    res.status(202).json({message: 'This is no page ', status: 200})
}

exports.register = async (req, res) => {
    // extract info first from req.body
    try{
        const {name, email, password} = req.body
        
        // make a middleware here to check if user exists already or not
        // if user exists, return error
        // also make a middleware to check if all fields are filled or not
        // if not, return error
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })

        res.status(201).json({
            success: true,
            message: "User created Successfully",
            user
        })

    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            message: "User not created",
            error
        })
    }
}


