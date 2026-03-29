const mongoose = require("mongoose");


const tokenblacklistedSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is unavailable"],
        unique:true
    }
},
{
    timestamps:true
})

tokenblacklistedSchema.index({createdAt:1},
    {expireAfterSeconds:60*60*24*3}
)

const tokenblacklistedModel = mongoose.model("tokenbacklisted",tokenblacklistedSchema);



module.exports = tokenblacklistedModel