import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import tokenBlacklistedModel from "../models/tokenBlacklisted.model.js";

async function userRegister(req,res){

    const {name,email,password} =req.body;

    const isEmailExist = await userModel.findOne({email:email}).select("+password")

    if(isEmailExist){

        return res.status(402).json({
            message:"This email is already exist"
        })
    }
    
    const user = await userModel.create({
        name,
        email,
        password
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})


    res.cookie("token",token)

    res.status(200).json({
        user:{
        user:user.name,
        email:user.email,
        password:user.password,
    },
    token:token
    })


}

async function userLogin(req,res){

    const {email,password} = req.body;

    const user = await userModel.findOne({email:email});

    if(!user){
        return res.status(409).json({
            message:"This user not exist"
        })
    }

    const isvalidpassword = await  user.comparePassword(password)

    if(!isvalidpassword){
        return res.status(402).json({
            message:"Wron password"
        })
    }

    const token = jwt.sign({userId:user},process.env.JWT_SECRET,{expiresIn:"3d"})


    res.cookie("token",token)

    res.status(200).json({
        user:{
        user:user.name,
        email:user.email,
        password:user.password,
    },
    token:token
    })

}

async function userLogout(req,res){

    const token = req.cookies.token || req.headers.authorization?.split('')[1];

    if(!token){
        return res.status(400).json({
            message:"You dont have token"
        })
    }

    const black = await tokenBlacklistedModel.updateOne(
        { token: token },
        { token: token },
        { upsert: true }
    )

    res.clearCookie("token")

    return res.status(200).json({
        message:"User logout successfully"
    })

}

export default {userRegister,userLogin,userLogout}
