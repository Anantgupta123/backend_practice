const mongoose = require("mongoose");

 async function connectDB(){

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database is connected to successfully")
    })
    .catch((err)=>{

        console.log("Not connected to data base")

    })
 }

 module.exports = connectDB;