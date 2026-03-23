import mongoose from "mongoose";

const tokeblacklisteSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token is required to Blacklisted"],
        unique:[true,"Invalid token "]
    }
},{
    timestamps:true
})

tokeblacklisteSchema.index({creadeAt:1},
    {expireAfterSeconds:60*60*24*3}

)

const blacklistedModel = mongoose.model("TokenBlacklisted",tokeblacklisteSchema)

export default blacklistedModel