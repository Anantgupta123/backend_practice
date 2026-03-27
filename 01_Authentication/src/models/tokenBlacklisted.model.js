import mongoose from "mongoose";

const tokenBlacklistedSchema = new mongoose.Schema({

    token:{
        type:String,
        required:[true,"you dont have token"],
        unique:true
    }
},{timestamps:true})

tokenBlacklistedSchema.index({createdAt:1},
    {expireAfterSeconds:60*60*24*3}
)

const tokenBlacklistedModel = mongoose.model("tokenBlacklisted",tokenBlacklistedSchema);

export default tokenBlacklistedModel