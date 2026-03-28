import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"
import tokenBlacklistedModel from "../models/tokenBlacklisted.model.js";




async function userRgister(req,res){

    const {name,email,password} = req.body;

    const isValidemail = await userModel.findOne({email:email})

    if(isValidemail){

        return res.status(402).json({
            message:"This email is already registered"
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
        message:"user register successfully",
        user:user.name,
        email:user.email,
        password:user.password
    })


}


async function userLogin(req,res){

    const {email,password} = req.body;

    const user = await userModel.findOne({email:email}).select("+password")

    if(!user){

        return res.status(401).json({
            message:"This user not found please try again"
        })
    }

    const isValidePassword = await user.comparePassword(password);

    if(!isValidePassword){

        return res.status(401).json({
            message:"Wrong password"
        })
    }

    const token  = jwt.sign({userId:user},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token)

    res.status(200).json({
        messaage:"user login successfully",
        user:user.name,
        user:user.email,
        password:user.password


    })



}


async function userLogout(req,res){

    const token = req.cookies.token || req.headers.authorization?.split('')[1];

    if(!token){
        return res.status(409).json({
            messaage:"token is messing"
        })
    }

    const tokenBlacklisted = await tokenBlacklistedModel.create({
        token:token
    })



    res.clearCookie("token")

    res.status(200).json({
        messsage:"User logout successfully",
        token:tokenBlacklisted.token
    })
}

export default {userRgister,userLogin,userLogout}