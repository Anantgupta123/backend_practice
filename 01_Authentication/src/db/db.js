import mongoose from "mongoose";

async function conntectDB(){

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Data base is connected to db")
    })
    .catch((err)=>{

        console.log(err)
        console.log("Not connected")
    })
}

export default conntectDB
