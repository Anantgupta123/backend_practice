import userModel from "../models/auth.model.js"
import jwt from "jsonwebtoken"
import tokenBlacklistedModel from "../models/tokenblacklist.model.js"



async function userRegister(req,res){

    const {name , email , password}  = req.body;

    const isEmailExist = await userModel.findOne({email:email})

    if(isEmailExist){
        return res.status(401).json({
            message:"This email is already exist try another"
        })
    }

    const user = userModel.create({
        name,
        email,
        password
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(201).json({
        user:{
            userId:user._id,
            user:(await user).name,
            email:(await user).email
        },
        token:token
    })



}

async function userLogin(req,res){

    const {email,password}  = req.body;

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Invalid email address"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"The password is wron try again"
        })
    }

    const token = await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User loging successfull",
        user:user.name,
        email:user.email
    })
}

async function userLogout(req,res){

    const token = req.cookies.token || req.headers.authorization?.split("")[1]

    if(!token){
        res.status(200).json({
            message:"user logout successfully"
        })
    }

    await tokenBlacklistedModel.create({
        token:token
    })

    res.clearCookie("token")

    res.status(201).json({
        mesage:"User logout successfull"
    })
}

export default {userRegister,userLogin,userLogout}