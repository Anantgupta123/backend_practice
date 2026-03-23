import mongoose from "mongoose";

async function connectdb(){

    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Data base is connect successfully")
    })
    .catch((err)=>{
        console.log("not connectdb");
        console.log(err)
        process.exit(1)
    })
}

export default connectdb