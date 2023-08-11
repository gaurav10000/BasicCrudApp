
const User = require('../models/userModel.js')
const {registerfieldChecker, loginfieldChecker} =  require('../middlewares/middlewares.js')
const bcrypt = require('bcrypt') // using this package t hash passwords to store in the database and to compare passwords

exports.home =  (req, res) => {
    res.status(202).json({message: 'This is the home page', status: 200})
}

exports.register = async (req, res) => {
    // extract info first from req.body
    try{
        // extract info first from req.body
        const {name, email, password} = req.body

        // check if all fields are filled using a middleware
        if(!registerfieldChecker(req.body)) {
            return res.status(400).json({
                message: "All input fields are required"
            })
        }
        //hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        // if user is created successfully, send a message "User created Successfully"
        res.status(201).json({
            success: true,
            message: "User created Successfully",
        })

    } catch(error){ 
        if(error.code == 11000) { // if some user is already registered with the same email, send a message "Email already exists"
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                error
            })
        }
        res.status(400).json({ // if user is not created successfully due to some reason, send a message "User not created"
            success: false,
            message: "User not created",
            error
        })
    }
}

exports.login = async (req, res) => {
    
    try {
        // extract info first from req.body
        const {email, password} = req.body
        // check if all fields are filled usign middleware
        if(!loginfieldChecker(req.body)) {
            return res.status(400).json({
                message: "All input fields are required"
            })
        }
        // check if user exists
        const user = await User.findOne({email}).select("+password")
        
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "No account associated with this mail",
            })
        }

        // check if password matches
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password)
        
        // if password is correct, send a message "User logged in successfully"
        if(isPasswordCorrect) {
            return res.status(200).json({
                success: true,
                msg: "User logged in successfully",
            })
        }else{ // if password is incorrect, send a message "Password incorrect"
            return res.status(400).json({
                success: false,
                msg: "Password incorrect",
            })
        }
    } catch (error) { // if user does not exist or any other error occurs then send a message "User not logged in"
        res.status(400).json({
            success: false,
            msg: "User not logged in",
            error
        })
    }
}

