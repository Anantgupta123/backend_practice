const jwt = require("jsonwebtoken");
const tokenblacklistedModel = require("../models/tokenblacklisted.model.js")

async function authUser(req,res,next){

    const token = req.cookies.token

    if(!token){

        return res.status(400).json({
            message:"You dont have access token"
        })
    }

    const tokenbacklisted = await tokenblacklistedModel.findOne({token})

    if(tokenbacklisted){
        
        return res.status(400).json({
            message:"Your token is now expire "
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        req.user = decoded

        next()
    } catch(err){

        console.log(err);
        console.log("Decoded faild mid 24 wrong token")
    }
}


module.exports ={
     authUser
    };