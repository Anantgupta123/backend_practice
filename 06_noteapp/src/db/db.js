import mongoose from "mongoose"

async function connectDB(){

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{

        console.log("Database is connect to DB")

    })
    .catch((err)=>{

        console.log(err)
        console.log("Server is not connected to db")
    })
}

export default connectDB;