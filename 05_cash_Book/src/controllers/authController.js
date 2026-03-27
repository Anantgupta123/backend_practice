import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"

async function userRegister(req,res){
    
    const {name,email,password}  = req.body

    const isExist = await userModel.findOne({email:email})

    if(isExist){
        return res.status(402).json({
            message:"user alreay exist"
        })
    }

    if(!name || !email || !password){
        return res.status(401).json({
            message:"please enter all details"
        })
    }

    const user = userModel.create({
        name,email,password
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECTER,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        user:{
        user:(await user).name,
        email:(await user).email
    },
    token:token
    })


}


async function userLogin(req,res){

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Invalid email please try another"
        })
    }

    const isValidpassword = await user.comparePassword(password)

    if(!isValidpassword){
        return res.status(401).json({
            message:"wrong password please try again"
        })
    }

    const token  = jwt.sign({userId:user},process.env.JWT_SECTER,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(201).json({
        user:{
        user:user.name,
        email:user.email
    },
    token:token
    })


}



export default {userRegister,userLogin}