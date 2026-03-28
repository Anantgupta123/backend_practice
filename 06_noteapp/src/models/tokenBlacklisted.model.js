import mongoose from "mongoose";

const tokenBlacklistedSchema = new mongoose.Schema({
    token:{
        type:String,
        unique:[true,"this token is done it"],
        required:[true,"token i required"]
    }
},{timestamps:true})

tokenBlacklistedSchema.index({createdAt:1},
    {expireAfterSeconds:60*60*24*3}
)

const tokenBlacklistedModel = mongoose.model("TokenBlacklisted",tokenBlacklistedSchema)

export default tokenBlacklistedModel