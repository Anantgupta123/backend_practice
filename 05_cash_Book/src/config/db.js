import mongoose from "mongoose";

async function connectDB(){

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to db")
    })
    .catch((err)=>{
        console.log("Server is not connected to db")
        console.log(err)
        process.exit(1)
    })
}

export default connectDB