import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function authMiddleware(req,res,next){

    const token = req.cookies.token || req.headers.authrization?.split("")[1];

    if(!token){
        return res.status(402).json({
            message:"You don't hava token"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.userId);

        req.user = user

        return next()
    } catch(err){

        return res.status(401).jsonr({
            message:"Wrong access token"
        })
    }
}

export default {
    authMiddleware
}