import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

async function authMiddleware(req,res,next){

    const token = req.cookies.token || req.headers.authrization?.split("")[1]

    if(!token){
        return res.status(401).json({
            message:"Please try with valid user"
        })
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECTER);

        const user =await userModel.findById(decoded.userId)

        req.user = user 

        return next()
    }
    catch(err){
        console.log(err);

        return res.status(401).json({
            message:"middle warw error "
        })
    }

}

export default {authMiddleware}