const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')



//register

exports.registerUser = async(req, res) =>{
    const {userName, email, password} = req.body;

    try {

        const checkUser = await User.findOne({email});
        if(checkUser) return res.json({success: false, message: 'User Already Exist whit same Email, please try again'});

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, 
            email, 
            password: hashPassword,
        })

        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registration Succesfully",
        })
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Some Error Occurred",
        });
    }
}

//login

exports.loginUser = async(req, res) =>{

    const {email, password} = req.body;
    
    
    try {

        const checkUser = await User.findOne({email});
        if(!checkUser) return res.json({
            success: false, 
            message: 'Email dosent exist, please try again or register' 
        });
        
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if(!checkPasswordMatch) return res.json({
            success: false,
            message: 'Incorrect password! Please try again'
        });


        const token = jwt.sign(
            {
                id:checkUser._id, 
                role: checkUser.role, 
                email:checkUser.email
            }, 
            'CLIENT_SECRET_KEY', 
            {expiresIn: '60m'}
        );
    
        
        res.cookie('token', token, {httpOnly: true, secure:false}).json({
            success: true,
            message: 'Login Successfully',
            user:{
                email:checkUser.email,
                role: checkUser.role,
                id:checkUser._id
            }
        });
        
    } catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Some error occurred",
        });
    }
}


//loginOut












//auth middleware

