
const User = require('../models/userModel.js')
const {registerfieldChecker, loginfieldChecker} =  require('../middlewares/middlewares.js')
const bcrypt = require('bcrypt')

exports.home =  (req, res) => {
    res.status(202).json({message: 'This is no page ', status: 200})
}

exports.register = async (req, res) => {
    // extract info first from req.body
    try{
        const {name, email, password} = req.body
        // check if all fields are filled usign middleware
        // console.log(req.body);
        if(!registerfieldChecker(req.body)) {
            return res.status(400).json({
                msg: "All input fields are required"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hashSync(password, salt)
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        res.status(201).json({
            success: true,
            message: "User created Successfully",
        })

    } catch(error){
        if(error.code == 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
                error
            })
        }
        res.status(400).json({
            success: false,
            message: "User not created",
            error
        })
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    try {
        // check if all fields are filled usign middleware
        if(!loginfieldChecker(req.body)) {
            console.log("in field checker");
            return res.status(400).json({
                msg: "All input fields are required"
            })
        }
        console.log("field checker passed");
        // check if user exists
        console.log("before user");
        const user = await User.findOne({email}).select("+password")
        console.log("here");
        if(!user) {
            return res.status(400).json({
                success: false,
                msg: "No account associated with this mail",
            })
        }
        console.log("user found");
        console.log(user.password);
        console.log(password);
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password)
        
        if(isPasswordCorrect) {
            return res.status(200).json({
                success: true,
                msg: "User logged in successfully",
            })
        }else{
            return res.status(400).json({
                success: false,
                msg: "Password incorrect",
            })
        }

        

    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "User not logged in",
            error
        })
    }
}

