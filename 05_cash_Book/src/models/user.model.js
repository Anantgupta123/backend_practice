import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:[true,"Name is required"],
        unique:[true,"This user name is already exist"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"This email is alredy exist"],
        immutable:true,
        index:true
    },
    password:{
        type:String,
        required:[true,"Password is require"],
        minlength:[6,"Atrist 6 char is require"],
        select:true
    }

},{timestamps:true})


userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return 
    }

    const hashPassword = await bcrypt.hash(this.password,10) 

    this.password = hashPassword
})

userSchema.methods.comparePassword = async function(password) {

    return await bcrypt.compare(password,this.password)
}



const userModel = mongoose.model("User",userSchema);

export default userModel