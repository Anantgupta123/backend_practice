import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"This user name already exist"],
        required:[true,"User name is required"]
    },
    email:{
        type:String,
        unique:[true,"This email name already exist"],
        required:[true,"email name is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
},
{
    timestamps:true
})

userSchema.pre("save",async function(){

    if(!this.isModified("password")){
        return;
    }

    const hashpassword = await bcrypt.hash(this.password,10);

    this.password = hashpassword
})

userSchema.methods.comparePassword = async function(password){

    console.log(password,this.password);

    return await bcrypt.compare(password,this.password)    
}

const userModel = mongoose.model("User",userSchema);

export default userModel