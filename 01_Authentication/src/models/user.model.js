import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Please try with other user name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "This email already exists"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Minimum length is 6"]
    }
},{timestamps:true});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return ;
    }
    const hashpassword = await bcrypt.hash(this.password, 10);
    this.password = hashpassword;


});

userSchema.methods.comparePassword = async function(password) {
    console.log(password, this.password);
    return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;

