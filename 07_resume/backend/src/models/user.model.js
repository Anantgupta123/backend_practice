const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"This user name already exist"],
        required:true
    },
    email:{
        type:String,
        unique:[true,"This email already exist"],
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})



const userModel = mongoose.model("User",userSchema);

module.exports = userModel;