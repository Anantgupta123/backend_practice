import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"This user name is already exist"],
        required:[true,"This user name is already exist "],
        lowercase:true
    },
    email:{
        type:String,
        unique:[true,"This email already register"],
        required:[true,"Email is required creating a Account"]
    },
    password:{
        type:String,
        required:[true,"Password is required creating an Account "],
        minlength:6,
        select:false
    }

},

{timestamps:true}

) 

userSchema.pre("save",async function(){

    if(!this.isModified("password")){

        return next()}

    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
})

userSchema.methods.comparePassword = async function(password){

    console.log(password,this.password);

   return  await bcrypt.compare(password,this.password)
}



const userModule = mongoose.model("User",userSchema);

export default userModule