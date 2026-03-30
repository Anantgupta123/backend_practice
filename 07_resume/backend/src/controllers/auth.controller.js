const userModel = require("../models/user.model.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const tokenblacklistedModel = require("../models/tokenblacklisted.model.js")


async function userRegister(req,res){

    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"Somthis is missing ither username , email, password"
        })
    }

    // const isEmail = await userModel.findOne({email:email})

    // if(isEmail){

    //     return res.status(402).json({
    //         message:"This email alredy present"
    //     })
    // }

    const userAlreadyExist = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(userAlreadyExist){

        return res.status(400).json({
            message:"This user alredy exist "
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token);

    res.status(201).json({
        message:"user create successfully brother",
        user:{
            username:user.username,
            email:user.email,
            password:user.password
        }
    })




}

async function userLogin(req,res){

    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){

        return res.status(400).json({
            message:"This email is not found please check your email"
        })
    }

    const passwordCheck = await bcrypt.compare(password,user.password)

    if(!passwordCheck){

        return res.status(400).json({
            message:"Wrong password please check your password"
        })
    }

    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        message:"user login successfully",
        user:{
            user:user
        }
    })
}


async function userLogout(req,res){


    const istoken = req.cookies.token || req.headers.authorization?.split("")[1];

    if(!istoken){

        return res.status(400).json({
            message:"You dont have a token"
        })
    }

    const token = req.cookies.token

    if(token){

        const tokenbacklisted = await tokenblacklistedModel.create({
            token
        })
    }

    res.clearCookie("token")

    res.status(200).json({
        message:"User logout successfully"
    })


}


async function getCurrentUser(req,res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"Your current user ",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            password:user.password
        }
    })
}




module.exports = {
    userRegister,
    userLogin,
    userLogout,
    getCurrentUser
}